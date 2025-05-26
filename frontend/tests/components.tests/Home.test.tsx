import { render,screen, waitFor } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import { describe,it,expect, vi } from "vitest";
import Home from "../../src/components/Home";
import EmployeeObject from "../../src/services/employeeService";
import { EmpObjectType } from "../../src/types/employee.types";
import axios from "axios";
import userEvent from "@testing-library/user-event";

describe('testing home component',()=>{
    it('testing home components render',()=>{
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        )
        const employeesText=screen.getByRole('link',{name:/employees/i})
        const logoutButton=screen.getByRole('button',{name:/logout/i})
        const headingMessage=screen.getByRole('heading',{name:/no employees found/i})
        expect(employeesText).toBeInTheDocument()
        expect(logoutButton).toBeInTheDocument()
        expect(headingMessage).toBeInTheDocument()
    })
    it('testing home component functionality',async ()=>{
        const mockAlert=vi.spyOn(window,'alert')
        const mockGetEmployees=vi.spyOn(EmployeeObject,'getEmployees')
        const mockAxiosGet=vi.spyOn(axios,'post')
        mockAxiosGet.mockResolvedValue({msg:'done'})

        const data:EmpObjectType[]=[
            {
                EmpId: 1,
                EmpName: "abc",
                EmpDesig: "azs",
                EmpDept: "wex",
                EmpSal: 1238
            },
            {
                EmpId: 2,
                EmpName: "xyz",
                EmpDesig: "qaz",
                EmpDept: "uio",
                EmpSal: 234
            }
        ]
        mockGetEmployees.mockResolvedValue(data)
        mockAlert.mockImplementation(()=>{
            console.log('=> alert')
        })
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        )
        await waitFor(()=>{
            expect(mockGetEmployees).toHaveBeenCalledTimes(1)
        })
        
    })
    it('testing logout button functionality',async ()=>{
        const user=userEvent.setup()
        const mockConsole=vi.spyOn(console,'log')
        mockConsole.mockReturnValue()
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        )
        const button=screen.getByRole('button',{name:/logout/i})
        expect(button).toBeInTheDocument()
        await user.click(button)
        expect(mockConsole).toBeCalled()
    })
})