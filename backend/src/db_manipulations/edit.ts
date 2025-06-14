import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import conn from "./db_connection";
import { DataInf } from "../models/query.models";
import dotenv from 'dotenv'

dotenv.config()
const table=process.env.DB_TABLE
export async function updateEmployee(req: Request, res: Response) {
    const data: DataInf = req.body
    // console.log(req.body)
    try {
        const result = (await conn.query(`update ${table} set "EmpName"=$1,"EmpDesig"=$2,"EmpDept"=$3,"EmpSal"=$4 where "Empid"=$5`,
            [data.EmpName, data.EmpDesig, data.EmpDept, data.EmpSal, req.params.id])).rows
        const rowsAffected = (result as unknown as ResultSetHeader).affectedRows
        if (rowsAffected === 0){
            res.status(404).send({ msg: "user not found" })
            return;
        }
        else{
            res.status(200).send({ msg: "updated" })
            return;
        }
    }
    catch {
        res.status(500).send({ err: "error occured" })
        return;
    }
}
