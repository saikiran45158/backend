import Update from './Update'
import { DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import AddEmp from "./AddEmp"
import { deleteDialogStyle } from '../styles/componentStyles'

interface DialogProps {
    AddDialog: boolean,
    handleAddDialogBack: () => void,
    UpdateDialog: boolean,
    editId: number,
    handleEditDialogBack: () => void,
    deleteDialog: boolean,
    setDeleteDialog: (deleteDialog: boolean) => void,
    handleOk: () => void
}
function Dialogs({AddDialog, handleAddDialogBack, UpdateDialog, editId, handleEditDialogBack, deleteDialog, setDeleteDialog, handleOk }: DialogProps) {
    return (
        <>
            <Dialog open={AddDialog}>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <AddEmp />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogBack}>Back</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={UpdateDialog}>
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                    <Update id={editId} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogBack}>Back</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialog}>
                <DialogContent>
                    Do you want to delete this employee
                </DialogContent>
                <DialogActions sx={deleteDialogStyle}>
                    <Button onClick={() => setDeleteDialog(false)}>cancel</Button>
                    <Button onClick={handleOk}>confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Dialogs
