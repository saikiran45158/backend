import { expect, it, describe, vi } from "vitest";
import MyPagination from "../../src/components/MyPagination";
import { render, screen } from "@testing-library/react"
import { userEvent } from '@testing-library/user-event'

function demoFunction(page: number) {
    console.log(page)
}
describe('checking Mypagination Component', () => {
    it('checking elements of MyPagination when employeesSize is zero', () => {
        render(<MyPagination employeesSize={0} currentPage={0} setCurrentPage={demoFunction} />)
        // screen.debug()
        const buttons = screen.queryAllByRole('button')
        expect(buttons.length).toBe(0)
    })

    it('checking elements of MyPagination when employees has some size', () => {
        const employeesSize = 7
        const currentPage = 1
        render(<MyPagination employeesSize={employeesSize} currentPage={currentPage} setCurrentPage={demoFunction} />)
        // screen.debug()
        const buttons = screen.queryAllByRole('button')
        expect(buttons.length).toBe(Math.ceil(employeesSize / 5))
    })

    it('checking buttons calls correct page ', async () => {
        const setCurrentPage = vi.fn((page) => {
            console.log(page)
        })
        const employees = 12
        const currentPage = 1
        render(<MyPagination employeesSize={employees} currentPage={currentPage} setCurrentPage={setCurrentPage} />)
        // screen.debug()
        const buttons = screen.getAllByRole('button')
        const user = userEvent.setup()
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i]
            expect(button).toBeInTheDocument()
            await user.click(button)
            expect(setCurrentPage).toHaveBeenCalledWith(i + 1)
        }
    })
})