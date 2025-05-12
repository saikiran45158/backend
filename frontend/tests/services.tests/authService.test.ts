import axios, { AxiosError } from "axios";
import { describe, expect, it, vi } from "vitest";
import authenticate from "../../src/services/authService";
import { userType } from "../../src/types/user.types";

describe('checking authService', () => {

    it('if response is received', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const data = { user: 'qwe', password: 'abc' }
        mockPost.mockImplementation(async () => {
            return { data: { token: 'token' }, status: 200 }
        })
        expect(authenticate(data)).toBeTruthy()
    })

    it('if response is rejected expected error incorrect user', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const data: userType = { user: 'a2qe', password: 'abc' } 
        const error = new AxiosError(
            'incorrect user',
            undefined,
            undefined,
            undefined,
            {
                status: 401,
                data: { msg: 'incorrect user' },
                statusText: '',
                headers: {},
                config: {
                    headers: new axios.AxiosHeaders()
                },
            }
        );
           
        mockPost.mockImplementation(() => {
            return Promise.reject(error);
        })
        let status
        try{
            status=await authenticate(data)
        }
        catch{
            status=error.status
        }
        expect(status).toBe(401)
    })
    it('if response is rejected expected server down', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const data: userType = { user: 'a2qe', password: 'abc' } 
        const error = new AxiosError(
            'incorrect user',
            undefined,
            undefined,
            undefined,
            {
                status: 500,
                data: { msg: 'server down' },
                statusText: '',
                headers: {},
                config: {
                    headers: new axios.AxiosHeaders()
                },
            }
        );
           
        mockPost.mockImplementation(() => {
            return Promise.reject(error);
        })
        let status
        try{
            status=await authenticate(data)
        }
        catch{
            status=error.status
        }
        expect(status).not.toBe(401)
    })

})