import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Login from "../../src/components/Login";
import * as authModule from "../../src/services/authService";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { userType } from "../../src/types/user.types";

describe('testing Login Component', () => {
    it('checking Login renders all elements', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
        //screen.debug()
        const userInput = screen.getByLabelText(/user/i)
        const passwordInput = screen.getByLabelText(/password/i)
        const buttons = screen.getAllByRole('button')

        expect(userInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(buttons[0]).toBeInTheDocument()
        expect(buttons[0]).toHaveTextContent(/login/i)
        expect(buttons[1]).toBeInTheDocument()
        expect(buttons[1]).toHaveTextContent(/signup/i)
    })
    it('checking Login component functionality', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
        //screen.debug()
        const mockAuth = vi.spyOn(authModule, 'default')
        // mockAuth.mockImplementation(()=>{
        //     return Promise.reject({err:'error'})
        // })
        mockAuth.mockImplementation((data: userType) => {
            console.log('authenticate function called', data)
            return Promise.resolve(true)
        })

        const userInput = screen.getByLabelText(/user/i)
        const passInput = screen.getByLabelText(/password/i)
        const loginButton = screen.getByRole('button', { name: 'login' })
        expect(loginButton).toHaveTextContent(/login/i)
        expect(loginButton).toBeInTheDocument()
        const user = userEvent.setup()
        await user.type(userInput, 'abc')
        await user.type(passInput, '123')
        await user.click(loginButton)
        expect(mockAuth).toHaveBeenCalledWith({ user: 'abc', password: '123' })
    })
})