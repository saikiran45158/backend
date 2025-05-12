import { Request, Response } from "express";
import conn from "./db_connection";

export async function getEmployees(req: Request, res: Response) {
    try {
        const results = await conn.query('select * from mytab order by empId')
        res.status(200).send(results[0])
        return;
    }
    catch {
        res.status(500).send({ err: "error occured" })
        return;
    }
}
export async function getEmployee(req: Request, res: Response) {
    try {
        const result = await conn.query('select * from mytab where empId=?', [+req.params.id])
       // console.log(result)
        res.status(200).send(result[0])
        return;
    }
    catch {
        res.status(500).send({ err: "error occured" })
        return;
    }
}

