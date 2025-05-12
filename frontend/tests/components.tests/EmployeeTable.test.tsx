import { expect, it,describe } from "vitest";
import EmployeeTable from "../../src/components/EmployeeTable";
import { EmpObjectType } from "../../src/types/employee.types";
import { render, screen } from "@testing-library/react";

function handleDemo(id: number): void {
    console.log(id)
}
describe('checking employee table', () => {
    it('if the employees array has zero length', () => {
        const EmployeeArray: EmpObjectType[] = []
        render(<EmployeeTable handleEdit={handleDemo} handleDelete={handleDemo} employees={EmployeeArray} />)
       // screen.debug()
        const heading = screen.queryByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/no employees/i)
    })
    it('if the employees array has some employees', () => {
        const EmployeeArray: EmpObjectType[] = [
            {
                EmpId: 1, EmpName: 'abc',
                EmpDesig: "qwe",
                EmpDept: "qwe",
                EmpSal: 123
            },
            {
                EmpId: 2, EmpName: 'xyz',
                EmpDesig: "qaz",
                EmpDept: "zaq",
                EmpSal: 5678
            }
        ]
        render(<EmployeeTable handleEdit={handleDemo} handleDelete={handleDemo} employees={EmployeeArray} />)
       // screen.debug()
        EmployeeArray.forEach((ele) => {
            const empName = screen.getByText(ele.EmpName)
            expect(empName).toBeInTheDocument()
            expect(empName).toHaveTextContent(ele.EmpName)

        })
    })
})


