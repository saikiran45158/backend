import conn from "../../db_manipulations/db_connection";
import request from "supertest";
import  app  from "../../app";
import { QueryResult } from "mysql2/promise";
import token from "../token";

describe('checking addEmployee function', () => {
    test('addEmployee should return 200', async () => {
        
        const mockQuery = jest.spyOn(conn, 'query')
        mockQuery.mockResolvedValue([{} as unknown as QueryResult, []])
        const res = await request(app).post("/add").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200)
    })
    test('addEmployee should return 409', async () => {
        const mockQuery = jest.spyOn(conn, 'query')
        mockQuery.mockRejectedValue(409)
        const res = await request(app).post("/add").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(409)
    })
})
