import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import conn from "./db_connection";
import { DataInf } from "../models/query.models";

export async function updateEmployee(req: Request, res: Response) {
    const data: DataInf = req.body
    // console.log(req.body)
    try {
        const [result] = await conn.query('update mytab set empName=?,empDesig=?,empDept=?,empSal=? where empid=?',
            [data.EmpName, data.EmpDesig, data.EmpDept, data.EmpSal, req.params.id])
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
