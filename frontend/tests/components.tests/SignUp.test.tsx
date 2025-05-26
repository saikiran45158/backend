import { describe, it, expect, vi } from "vitest";
import SignUp from "../../src/components/SignUp";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as signServObj from "../../src/services/signupService";
import userEvent from "@testing-library/user-event";
import { userType } from "../../src/types/user.types";

describe('testing signup ', () => {

    it('check elements of signup renders', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>)
        const userInput = screen.getByLabelText(/user/i)
        const passwordInput = screen.getByLabelText(/password/i)
        const buttons = screen.getAllByRole('button')

        expect(userInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(buttons[0]).toBeInTheDocument()
        expect(buttons[0]).toHaveTextContent(/sign/i)
        expect(buttons[1]).toBeInTheDocument()
        expect(buttons[1]).toHaveTextContent(/login/i)
    })
    it('check signup component functionality', async () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>)
        const user = userEvent.setup()
        const mockSignUp = vi.spyOn(signServObj, 'signup')
        const mockWindow = vi.spyOn(window, 'alert')
        mockSignUp.mockImplementation(async (data: userType) => {
            console.log('signup sucessful with', data)
            return Promise.resolve(true)
        })
        mockWindow.mockImplementation(() => {
            console.log('redirecting to login page')
        })
        const userInput = screen.getByLabelText(/user/i)
        const userPass = screen.getByLabelText(/password/i)
        const signbutton = screen.getByRole('button', { name: /sign/i })
        expect(userInput).toBeInTheDocument()
        expect(userPass).toBeInTheDocument()
        expect(signbutton).toBeInTheDocument()
        await user.type(userInput, 'zxy')
        await user.type(userPass, '456789')
        await user.click(signbutton)
        expect(mockSignUp).toHaveBeenCalledWith({ user: 'zxy', password: '456789' })
    })
})