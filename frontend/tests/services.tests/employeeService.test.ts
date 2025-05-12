import { describe, expect, it, vi } from "vitest";
import EmployeeObject from "../../src/services/employeeService";
import { EmpObjectType } from "../../src/types/employee.types";
import axios from "axios";

describe('checking addEmployee method in employee class', () => {
    const data: EmpObjectType = {
        EmpId: 1,
        EmpName: "abc",
        EmpDesig: "qwe",
        EmpDept: "ak",
        EmpSal: 1234
    }
    it('check if employee added successfully', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const mockAlert = vi.spyOn(window, 'alert')
        mockAlert.mockReturnValue()
        mockPost.mockImplementation(async () => {
            return Promise.resolve({ data: { msg: 'added' }, status: 200 })
        })
        const res = await EmployeeObject.addEmployee(data)
        expect(res).toBe(true)
    })
    it('check if employee id already exist', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const mockAlert = vi.spyOn(window, 'alert')
        mockAlert.mockReturnValue()
        const error = new axios.AxiosError(
            'id exist',
            undefined,
            undefined,
            undefined,
            {
                status: 409,
                data: {},
                statusText: '',
                headers: {},
                config: {
                    headers: new axios.AxiosHeaders()
                },
            }
        )
        mockPost.mockImplementation(async () => {
            return Promise.reject(error)
        })
        await expect(EmployeeObject.addEmployee(data)).rejects.toThrowError(/exist/i)
    })
    it('check if token is expired', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const mockAlert = vi.spyOn(window, 'alert')
        mockAlert.mockReturnValue()
        const error = new axios.AxiosError(
            'id exist',
            undefined,
            undefined,
            undefined,
            {
                status: 401,
                data: {},
                statusText: '',
                headers: {},
                config: {
                    headers: new axios.AxiosHeaders()
                },
            }
        )
        mockPost.mockImplementation(async () => {
            return Promise.reject(error)
        })
        await expect(EmployeeObject.addEmployee(data)).rejects.toThrowError(/session expired/i)
    })
    it('check if server not reponded', async () => {
        const mockPost = vi.spyOn(axios, 'post')
        const mockAlert = vi.spyOn(window, 'alert')
        mockAlert.mockReturnValue()
        const error = new axios.AxiosError(
            'id exist',
            undefined,
            undefined,
            undefined,
            {
                status: 500,
                data: {},
                statusText: '',
                headers: {},
                config: {
                    headers: new axios.AxiosHeaders()
                },
            }
        )
        mockPost.mockImplementation(async () => {
            return Promise.reject(error)
        })
        await expect(EmployeeObject.addEmployee(data)).rejects.toThrowError(/server down/i)
    })
})

describe('checking getEmployee method in employee class', () => {
    const data: EmpObjectType = {
        EmpId: 1,
        EmpName: "abc",
        EmpDesig: "qwe",
        EmpDept: "ak",
        EmpSal: 1234
    }
    it('check if employee retrieved successfully',async () => {
        const mockGet=vi.spyOn(axios,'get')
        mockGet.mockImplementation(async () => {
            return Promise.resolve({ data: [data], status: 200 })
        })
        await expect(EmployeeObject.getEmployee(data.EmpId)).resolves.toBe(data)
    })
    it('check if employee not found',async ()=>{
        const mockGet=vi.spyOn(axios,'get')
        const mockAlert = vi.spyOn(window, 'alert')
        mockAlert.mockReturnValue()
        mockGet.mockImplementation(async () => {
            return Promise.resolve({ data: [], status: 200 })
        })
        await expect(EmployeeObject.getEmployee(data.EmpId)).resolves.toBeFalsy()
    })
})

describe('checking getEmployees method in employee class', () => {
    const data: EmpObjectType[] = [{
        EmpId: 1,
        EmpName: "abc",
        EmpDesig: "qwe",
        EmpDept: "ak",
        EmpSal: 1234
    },
    {
        EmpId: 2,
        EmpName: "xyz",
        EmpDesig: "uio",
        EmpDept: "ki",
        EmpSal: 6570
    }]
    it('checking getEmployees retrieves all Employees',async ()=>{
        const mockGet=vi.spyOn(axios,'get')
        mockGet.mockImplementation(async () => {
            return Promise.resolve({ data: data ,status: 200 })
        })
        await expect(EmployeeObject.getEmployees()).resolves.toBe(data)
    })
})

describe('checking editEmployee method in employee class', () => {
    const data: EmpObjectType = {
        EmpId: 1,
        EmpName: "abc",
        EmpDesig: "qwe",
        EmpDept: "ak",
        EmpSal: 1234
    }
    it('checking employee details updated successfully',async ()=>{
        const mockPatch=vi.spyOn(axios,'patch')
        mockPatch.mockImplementation(async () => {
            return Promise.resolve({ data: {msg:'updated'} ,status: 200 })
        })
        const res=await EmployeeObject.editEmployee(data.EmpId,data)
        expect(res).toMatch(/updated/i)
    })
})

describe('checking deleteEmployee method in employee class', () => {
    const data: EmpObjectType = {
        EmpId: 1,
        EmpName: "abc",
        EmpDesig: "qwe",
        EmpDept: "ak",
        EmpSal: 1234
    }
    it('checking deleteEmployee delete the Employee',async ()=>{
        const mockDelete=vi.spyOn(axios,'delete')
        mockDelete.mockImplementation(async () => {
            return Promise.resolve({ data:'deleted' ,status: 200 })
        })
        const res=await EmployeeObject.deleteEmployee(data.EmpId)
        expect(res).toMatch(/deleted/i)
    })
})
