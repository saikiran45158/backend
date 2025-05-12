import { Request, Response } from "express";
import conn from "./db_connection";
import { DataInf } from "../models/query.models";

export async function addEmployee(req: Request, res: Response): Promise<void> {
    const data: DataInf = req.body
    try {
        await conn.query('insert into mytab(EmpId,EmpName,EmpDesig,EmpDept,EmpSal) values(?,?,?,?,?)',
            [data.EmpId, data.EmpName, data.EmpDesig, data.EmpDept, data.EmpSal])
        res.status(200).send({ msg: 'done' })
        return;
    }
    catch {
        res.status(409).send({ error: 'Error occured' })
        return;
    }
}

