import { JSX, useEffect, useState } from "react"
import { EmpObjectType } from "../types/employee.types"
import EmployeeObject from "../services/employeeService"
import { Add, Logout } from "@mui/icons-material"
import { boxStyle, navBarStyles, searchBoxStyles, tableContainerStyle } from "../styles/componentStyles"
import { Box, Button, Fab, Paper, TableContainer, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import EmployeeTable from "./EmployeeTable"
import Dialogs from "./Dialogs"
import MyPagination from "./MyPagination"
import Search from "./Search"

export default function Home(): JSX.Element {
    const [UpdateDialog, setUpdateDialog] = useState(false)
    const [AddDialog, setAddDialog] = useState(false)
    const [editId, setEditId] = useState(0)
    const [employees, setEmployees] = useState<EmpObjectType[]>([])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const employeesPerPage: number = Number(process.env.EMPLOYEES_PER_PAGE)
    const navigate = useNavigate();
    useEffect(() => {
        const allEmployees = async () => {
            try {
                const Employees: EmpObjectType[] = await EmployeeObject.getEmployees()
                setEmployees(Employees)
            }
            catch (err) {
                if (typeof err === 'object') {
                    const errMsg = (err as { message: string }).message
                    if (errMsg.localeCompare('session expired please relogin') === 0) {
                        window.alert(errMsg)
                        navigate('/')
                    }
                }
            }
        }
        allEmployees()
    }, [UpdateDialog, AddDialog, deleteId, currentPage, navigate])

    const endIndex: number = employeesPerPage * currentPage
    const startIndex: number = endIndex - employeesPerPage
    const currentEmployees: EmpObjectType[] = employees.slice(startIndex, endIndex)

    function handleEdit(id: number): void {
        setUpdateDialog(true)
        setEditId(id)
    }
    async function handleOk() {
        try {
            if (deleteId !== 0) {
                await EmployeeObject.deleteEmployee(deleteId)
            }
            setDeleteDialog((prev) => !prev)
            setDeleteId(0)
        }
        catch (err) {
            if (typeof err === 'object') {
                const errMsg = (err as { message: string }).message
                if (errMsg.localeCompare('session expired please relogin') === 0) {
                    window.alert(errMsg)
                    navigate('/')
                }
                else
                    window.alert(errMsg);
            }
        }

    }
    async function handleDelete(id: number): Promise<void> {
        setDeleteDialog(true)
        setDeleteId(id)
    }

    function handleEditDialogBack(): void {
        setUpdateDialog(false)
    }

    function handleAddDialogBack(): void {
        setAddDialog(false)
    }

    function handleAddEmployee(): void {
        setAddDialog(true)
    }

    function handleLogOut(): void {
        localStorage.clear();
        navigate('/');
    }
    return (
        <Box sx={boxStyle}>
            <Box sx={navBarStyles}>
                <Link to='/home'><h2>Employees</h2></Link>
                <Button color='inherit' onClick={handleLogOut} ><Logout></Logout></Button>
            </Box>

            <Box sx={searchBoxStyles}>

                <Typography component='p' >
                    <Fab onClick={handleAddEmployee}><Add /></Fab>
                </Typography>
                <Search setEmployees={setEmployees} />

            </Box>

            <TableContainer sx={tableContainerStyle} component={Paper}>
                {

                    employees.length === 0 ? (<h3>No Employees Found </h3>) : (<EmployeeTable currentEmployees={currentEmployees} handleEdit={handleEdit} handleDelete={handleDelete} />)

                }
                <MyPagination employeesSize={employees.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            </TableContainer>

            <Dialogs AddDialog={AddDialog} handleAddDialogBack={handleAddDialogBack} UpdateDialog={UpdateDialog}
                editId={editId} handleEditDialogBack={handleEditDialogBack} deleteDialog={deleteDialog} setDeleteDialog={setDeleteDialog}
                handleOk={handleOk} />
        </Box>
    )
}
