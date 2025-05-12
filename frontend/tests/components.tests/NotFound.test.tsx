import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound from "../../src/components/NotFound";
import { MemoryRouter } from "react-router-dom";

describe('checking NotFound component', () => {
    it('checking NotFound Renders', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>)
        //screen.debug()
        const h2 = screen.getByRole('heading')
        const para = screen.getAllByRole('paragraph')
        expect(h2).toBeInTheDocument()
        expect(para[0]).toBeInTheDocument()
        expect(para[1]).toBeInTheDocument()
        expect(h2).toHaveTextContent(/404/i)
        expect(para[0]).toHaveTextContent(/not exist/i)
        expect(para[1]).toHaveTextContent(/back/i)
    })
})