import { Request, Response } from "express"
import { signup } from "../../authentication/signup"
import conn from "../../authentication/connection"

describe('checking signup function', () => {
    const req = {
        body: {
        }
    } as Request
    const res = {
        status: jest.fn(() => ({
            send: jest.fn((msg) => {
                console.log(msg)
            }),
        }))
    } as unknown as Response
    const mockExecute = jest.spyOn(conn, 'execute')
    afterEach(()=>{
        req.body={}
    })
    test('check if signup is successful', async () => {
        mockExecute.mockReturnThis()
        req.body['user'] = 'abcid'
        req.body['password'] = 1234
        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
    })

    test('check if signup is failed when user or password is empty', async () => {
        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
    })

    test('check if user name already exists',async ()=>{
        req.body['user'] = 'abcid'
        req.body['password'] = 1234
        mockExecute.mockImplementation(()=>{
            return Promise.reject({code:'ER_DUP_ENTRY'})
        })
        await signup(req,res)
        expect(res.status).toHaveBeenCalledWith(409)
    })

    test('check if internal error occurs',async ()=>{
        req.body['user'] = 'abcid'
        req.body['password'] = 1234
        mockExecute.mockImplementation(()=>{
            return Promise.reject({code:'uuuu'})
        })
        await signup(req,res)
        expect(res.status).toHaveBeenCalledWith(500)
    })
})