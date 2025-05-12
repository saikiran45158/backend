import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Error from "../../src/components/Error";

describe('testing Error Component', () => {
    it('Error Component renders with out message', () => {
        const message = ''
        render(<Error errorMsg={message} />)
       // screen.debug()
        const span = document.querySelector('span')
        expect(span).toHaveTextContent('')
    })
    it('Error Component renders with message', () => {
        const message = 'message'
        render(<Error errorMsg={message}></Error>)
       // screen.debug()
        const span = document.querySelector('span')
        expect(span).toHaveTextContent(message)
    })
})