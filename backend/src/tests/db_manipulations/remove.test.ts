import request from "supertest"
import { QueryResult, FieldPacket } from "mysql2"
import app from "../../app"
import conn from "../../db_manipulations/db_connection"
import token from '../token'


describe('checking removeEmployee',()=>{
    test('remove employee should return 200',async ()=>{
        const mockQuery=jest.spyOn(conn,'query')
        mockQuery.mockResolvedValue([{ affectedRows: 1 } as unknown as QueryResult,[] as FieldPacket[]])       
        const res=await request(app).delete('/delete/0').set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(200)
    })
    test('remove employee should return 404',async ()=>{
        const mockQuery=jest.spyOn(conn,'query')
        mockQuery.mockResolvedValue([{ affectedRows: 0 } as unknown as QueryResult,[] as FieldPacket[]])  
        const res=await request(app).delete('/delete/0').set('Authorization',`Bearer ${token}`)   
        expect(res.status).toBe(404)
    })
    test('remove employee should return 500',async ()=>{
        const mockQuery=jest.spyOn(conn,'query')
        mockQuery.mockRejectedValue('error occured') 
        const res=await request(app).delete('/delete/0').set('Authorization',`Bearer ${token}`)   
        expect(res.status).toBe(500)
    })
})