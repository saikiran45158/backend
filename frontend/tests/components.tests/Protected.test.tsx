import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Protected from "../../src/components/Protected";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const DummyComponent = () => (<div>dummyComponent</div>)

describe('checking Protected Component', () => {
    it('check if user logged in', () => {
        const isLoggedIn = 'true'
        render(<MemoryRouter>
            <Routes>
                <Route element={<Protected isLoggedIn={isLoggedIn} />}>
                    <Route path="/" element={<DummyComponent />}></Route>
                </Route>
            </Routes>
        </MemoryRouter>)
        // screen.debug()
        const element = screen.getByText(/dummyComponent/i)
        expect(element).toBeInTheDocument()
    })
    it('check if user not logged in', () => {
        const isLoggedIn = null
        render(<MemoryRouter>
            <Routes>
                <Route element={<Protected isLoggedIn={isLoggedIn} />}>
                    <Route path="/" element={<DummyComponent />}></Route>
                </Route>
            </Routes>
        </MemoryRouter>)
        const element = screen.queryByText(/dummyComponent/i)
        expect(element).not.toBeInTheDocument()
        // screen.debug()
    })
})