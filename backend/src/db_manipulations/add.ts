import { Request, Response } from "express";
import conn from "./db_connection";
import { DataInf } from "../models/query.models";
import dotenv from 'dotenv'

dotenv.config()
const table=process.env.DB_TABLE
export async function addEmployee(req: Request, res: Response): Promise<void> {
    const data: DataInf = req.body
    try {
        await conn.query(`insert into ${table} ("EmpId","EmpName","EmpDesig","EmpDept","EmpSal") values($1,$2,$3,$4,$5)`,
            [data.EmpId, data.EmpName, data.EmpDesig, data.EmpDept, data.EmpSal])
        res.status(200).send({ msg: 'done' })
        return;
    }
    catch (err){
        console.log(err)
        res.status(409).send({ error: 'Error occured' })
        return;
    }
}

