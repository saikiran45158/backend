import request from 'supertest'
import app from '../../app'
import conn from '../../db_manipulations/db_connection'
import { FieldPacket, QueryResult } from 'mysql2'
import token from '../token'

describe('checking the updateEmployee function',()=>{

    test('updateEmployee should return 200',async ()=>{
        const mockQuery=jest.spyOn(conn,'query')
        mockQuery.mockResolvedValue([{ affectedRows: 1 } as unknown as QueryResult,[] as FieldPacket[]])       
        const res=await request(app).patch('/update/0').set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(200)
    })
    test('updateEmployee should return 404',async ()=>{
        const mockQuery=jest.spyOn(conn,'query')
        mockQuery.mockResolvedValue([{ affectedRows: 0 } as unknown as QueryResult,[] as FieldPacket[]])     
        const res=await request(app).patch('/update/0').set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(404)
    })
    test('updateEmployee should return 500',async ()=>{
        const mockQuery=jest.spyOn(conn,'query')
        mockQuery.mockRejectedValue('error occured')        
        const res=await request(app).patch('/update/0').set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(500)
    })
})