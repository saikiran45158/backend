import conn from "../../authentication/connection"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginUser } from "../../authentication/login"
import { Request, Response } from "express"

describe('checking the loginUser function', () => {
    const req = {
        body: {
            user: 'abc',
            password: '1234'
        }
    } as Request
    const res = {
        status: jest.fn(() => ({
            send: jest.fn((msg) => {
                console.log(msg)
            }),
        }))
    } as unknown as Response
    const mockQuery = jest.spyOn(conn, 'query')
    const mockCompare = jest.spyOn(bcrypt, 'compare')
    const mockSign = jest.spyOn(jwt, 'sign')
    test('check if credentials are correct', async () => {
        mockQuery.mockReturnValue([['abc', '123'], []] as unknown as never)
        mockCompare.mockReturnValue(true as unknown as never)
        mockSign.mockReturnValue()
        await loginUser(req, res)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockCompare).toHaveBeenCalled()
        expect(mockSign).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
    })
    test('check if credentials are wrong',async ()=>{
        mockQuery.mockReturnValue([['abc', '123'], []] as unknown as never)
        mockCompare.mockReturnValue(false as unknown as never)
        mockSign.mockReturnValue()
        await loginUser(req, res)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockCompare).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
    })
    // test('if internal error occurs',async ()=>{
    //     mockQuery.mockImplementation(()=>{
    //         throw new Error('internal error')
    //     })
    //     mockCompare.mockReturnValue(true as unknown as never)
    //     mockSign.mockReturnValue()
    //     await loginUser(req, res)
    //     expect(()=>conn.query('as','sd')).rejects.toThrow(/internal/i)
    //     //expect(mockCompare).toHaveBeenCalled()
    //     expect(res.status).toHaveBeenCalledWith(401)
    // })
})