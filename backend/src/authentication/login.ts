import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { FieldPacket, QueryResult } from 'mysql2'
import bcrypt from 'bcrypt'
import pool from './connection'

export async function loginUser(req: Request, res: Response) {
    const AdminName: string = req.body.user
    const AdminPass: string = req.body.password
    try {
        const [rows]: [QueryResult, FieldPacket[]] = await pool.query('select * from users where userName=?', [AdminName])
        if (Array.isArray(rows) && rows.length === 0){
            res.status(404).send({ msg: 'user not found' })
            return;
        }
        else if (Array.isArray(rows)) {
            const { userName, password } = rows[0] as { userName: string, password: string }
            if (!await bcrypt.compare(AdminPass.toString(), password)) {
                res.status(401).send({ errMsg: 'wrong credentials' })
                return;
            }
            else {
                const payload = {
                    userName,
                    password,
                }
                if (!process.env.SECRET_KEY)
                    throw new Error('secret key undefined')
                const secretkey: jwt.Secret = process.env.SECRET_KEY
                const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })
                res.status(200).send({ token })
                return;
            }
        }
    }
    catch {
        res.status(500).send({ err: 'error occured' })
        return;
    }
}
