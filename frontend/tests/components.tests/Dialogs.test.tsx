import { describe, it, expect, vi } from "vitest";
import Dialogs from "../../src/components/Dialogs";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'

describe('checking Dialogs component', () => {
    const mockHandleAddDialog = vi.fn()
    const mockHandleEditDialog = vi.fn()
    const mockHandleDeleteDialog = vi.fn()
    const mockHandleOk = vi.fn()
    it('checking add Dialogs not renders',() => {
        render(
            <MemoryRouter>
                <Dialogs AddDialog={false} handleAddDialogBack={mockHandleAddDialog} UpdateDialog={false}
                    editId={0} handleEditDialogBack={mockHandleEditDialog} deleteDialog={false}
                    setDeleteDialog={mockHandleDeleteDialog} handleOk={mockHandleOk} /> </MemoryRouter>)
        const addDialog =screen.queryByRole('dialog', { name: /add/i })
        const editDialog=screen.queryByRole('dialog', { name: /update/i })
        const deleteDialog=screen.queryByRole('dialog', { name: /delete/i })
        expect(addDialog).not.toBeInTheDocument()
        expect(editDialog).not.toBeInTheDocument()
        expect(deleteDialog).not.toBeInTheDocument()
    })
    it('check add Dailogs renders',()=>{
        render(
            <MemoryRouter>
                <Dialogs AddDialog={true} handleAddDialogBack={mockHandleAddDialog} UpdateDialog={false}
                    editId={0} handleEditDialogBack={mockHandleEditDialog} deleteDialog={false}
                    setDeleteDialog={mockHandleDeleteDialog} handleOk={mockHandleOk} /> </MemoryRouter>)
        const addDialog =screen.queryByRole('dialog', { name: /add/i })
        expect(addDialog).toBeInTheDocument()
    })
})