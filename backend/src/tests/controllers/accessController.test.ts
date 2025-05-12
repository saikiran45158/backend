import app from "../../app";
import request from 'supertest'
import jwt from 'jsonwebtoken'

describe('checking accessController',()=>{
    test('check if code not found',async ()=>{
        const res=await request(app).get('/').set('Authorization','');
        expect(res.status).toBe(404)
    })
    test('check if token expired',async ()=>{
        const res=await request(app).get('/').set('Authorization','Bearer jsjdjde');
        expect(res.status).toBe(401)
    })
    test('check if token is verified',async ()=>{
        const mockVerify=jest.spyOn(jwt,'verify')
        mockVerify.mockImplementation(()=>true)
        await request(app).get('/').set('Authorization','Bearer jsjdjde');
        expect(mockVerify).not.toThrow()
    })
})