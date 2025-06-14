import { ResultSetHeader } from "mysql2";
import { Request, Response } from "express";
import conn from "./db_connection";
import dotenv from 'dotenv'

dotenv.config()
const table=process.env.DB_TABLE
export async function removeEmployee(req: Request, res: Response) {
    try {
        const result = (await conn.query(`delete from ${table} where "EmpId"=$1`, [req.params.id]))
        const rowsAffected = (result as unknown as ResultSetHeader).affectedRows
        if (rowsAffected === 0){
            res.status(404).send({ msg: "Employee not found" })
            return;
        }
        else{
           res.status(200).send({ msg: "Employee deleted" })
           return;
        }
    }
    catch {
        res.status(500).send({ err: "error occured" })
        return;
    }
}
