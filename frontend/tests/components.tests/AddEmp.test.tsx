import AddEmp from '../../src/components/AddEmp'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { EmpObjectType } from '../../src/types/employee.types'
import EmployeeObject from '../../src/services/employeeService'

describe('add element', () => {
    it('checking add component renders elements', () => {
        render(
            <MemoryRouter>
                <AddEmp />
            </MemoryRouter>
        )
        const idInput = screen.getByLabelText(/enter id/i)
        const nameInput = screen.getByLabelText(/enter name/i)
        const desigInput = screen.getByLabelText(/enter desig/i)
        const deptInput = screen.getByLabelText(/enter depart/i)
        const salInput = screen.getByLabelText(/enter sal/i)
        const buttons = screen.getByRole('button')

        expect(idInput).toBeInTheDocument()
        expect(nameInput).toBeInTheDocument()
        expect(desigInput).toBeInTheDocument()
        expect(deptInput).toBeInTheDocument()
        expect(salInput).toBeInTheDocument()
        expect(buttons).toHaveTextContent(/add/i)
    })
    it('checking functionality of add component', async () => {
        render(
            <MemoryRouter>
                <AddEmp />
            </MemoryRouter>
        )
        const mockAddEmployee = vi.spyOn(EmployeeObject, 'addEmployee')
        mockAddEmployee.mockReturnThis()
        const user = userEvent.setup()
        const data: EmpObjectType = {
            EmpId: 1,
            EmpName: 'abc',
            EmpDesig: 'qwe',
            EmpDept: 'asd',
            EmpSal: 46
        }
        const idInput = screen.getByLabelText(/id/i)
        const nameInput = screen.getByLabelText(/name/i)
        const desigInput = screen.getByLabelText(/design/i)
        const deptInput = screen.getByLabelText(/depar/i)
        const salInput = screen.getByLabelText(/salary/i)
        const button = screen.getByRole('button', { name: /add/i })
        expect(button).toHaveTextContent(/add/i)
        await user.type(idInput, data.EmpId.toString())
        await user.type(nameInput, data.EmpName)
        await user.type(desigInput, data.EmpDesig)
        await user.type(deptInput, data.EmpDept)
        await user.type(salInput, data.EmpSal.toString())
        await user.click(button)
        expect(mockAddEmployee).toHaveBeenCalledWith(data)
    })
})
