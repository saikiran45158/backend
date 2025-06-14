import conn from "../../db_manipulations/db_connection";
import { QueryResult } from "mysql2";
import request from "supertest";
import app from "../../app";
import token from '../token'


describe('checking getEmployees function', () => {
    test('getEmployees should return 200', async () => {
        // const mockQuery = jest.spyOn(conn, 'query')
        const mockQuery = jest.spyOn(conn, "query") as unknown as jest.Mock<Promise<any>>;
        mockQuery.mockResolvedValue([{} as unknown as QueryResult, []])
        const res = await request(app).get("/").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200)
    })
    test('getEmployees should return 500', async () => {
        // const mockQuery = jest.spyOn(conn, 'query')
        const mockQuery = jest.spyOn(conn, "query") as unknown as jest.Mock<Promise<any>>;
        mockQuery.mockRejectedValue(500)
        const res = await request(app).get("/").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(500)
    })
})
