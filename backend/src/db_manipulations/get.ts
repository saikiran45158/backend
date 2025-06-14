import { Request, Response } from "express";
import conn from "./db_connection";
import dotenv from 'dotenv'

dotenv.config()
const table=process.env.DB_TABLE
export async function getEmployees(req: Request, res: Response) {
    try {
        const results = await (await conn.query(`select * from ${table} order by "EmpId"`)).rows
        //console.log()
        res.status(200).send(results)
        return;
    }
    catch(err) {
        console.log(err)
        res.status(500).send({ err: "error occured" })
        return;
    }
}
export async function getEmployee(req: Request, res: Response) {
    try {
        const result = await (await conn.query(`select * from ${table} where "EmpId"=$1`, [+req.params.id])).rows
       // console.log(result)
        res.status(200).send([result[0]])
        return;
    }
    catch {
        res.status(500).send({ err: "error occured" })
        return;
    }
}

