import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import pool from './connection'

export async function signup(req: Request, res: Response) {
    const { user, password } = req.body as { user: string, password: string }
    if (!user || !password){
        res.status(400).send({ errorMsg: 'username or password not empty' })
        return;
    }
    else
        try {
            const rounds = 9
            const hashedpass = await bcrypt.hash(password.toString(), rounds)
            await pool.execute('insert into users (userName,password) values(?,?)', [user, hashedpass])
            res.status(201).send({ msg: 'account created successfully' })
            return;
        }
        catch (err) {
            if ((err as { code: string }).code === 'ER_DUP_ENTRY'){
                res.status(409).send({ errMsg: "user alredy exist" })
                return;
            }
            else {
                res.status(500).send({ errMsg: 'hashing error' })
                return;
            }
        }
}