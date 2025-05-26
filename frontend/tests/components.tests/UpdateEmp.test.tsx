import { describe, expect, it, vi } from "vitest";
import Update from "../../src/components/Update";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeObject from "../../src/services/employeeService";
import userEvent from "@testing-library/user-event";
import { EmpObjectType } from "../../src/types/employee.types";

describe('testing UpdateEmployee Component', () => {
    it('testing elements in Update Employee', () => {
        render(
            <MemoryRouter>
                <Update id={0} />
            </MemoryRouter>
        )
        const nameInput = screen.getByLabelText(/name/i)
        const desigInput = screen.getByLabelText(/desig/i)
        const deptInput = screen.getByLabelText(/depart/i)
        const salInput = screen.getByLabelText(/salary/i)
        const button = screen.getByRole('button')
        expect(nameInput).toBeInTheDocument()
        expect(desigInput).toBeInTheDocument()
        expect(deptInput).toBeInTheDocument()
        expect(salInput).toBeInTheDocument()
        expect(button).toHaveTextContent(/update/i)
    })
    it('testing update component functionality', async () => {
        const data: EmpObjectType = {
            EmpId: 0,
            EmpName: "asd",
            EmpDesig: "aks",
            EmpDept: "asq",
            EmpSal: 234
        }
        console.log(data.EmpId)
        render(
            <MemoryRouter>
                <Update id={data.EmpId} />
            </MemoryRouter>
        )
        const mockFetchUser = vi.spyOn(EmployeeObject, 'editEmployee')
        mockFetchUser.mockImplementation((id, data) => {
            console.log('updated successful', id, data)
            return Promise.resolve("")
        })

        const user = userEvent.setup()
        const nameInput = screen.getByLabelText(/name/i)
        const desigInput = screen.getByLabelText(/desig/i)
        const deptInput = screen.getByLabelText(/depart/i)
        const salInput = screen.getByLabelText(/salary/i)
        const updateButton = screen.getByRole('button', { name: /update/i })
        expect(updateButton).toBeInTheDocument()
        await user.type(nameInput, data.EmpName)
        await user.type(desigInput, data.EmpDesig)
        await user.type(deptInput, data.EmpDept)
        await user.type(salInput, data.EmpSal.toString())
        await user.click(updateButton)
        expect(mockFetchUser).toHaveBeenCalledWith(data.EmpId, {
            EmpId: 0,
            EmpName: "asd",
            EmpDesig: "aks",
            EmpDept: "asq",
            EmpSal: 234
        })
    })
})