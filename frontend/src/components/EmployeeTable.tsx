import { Edit, Delete } from "@mui/icons-material"
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import { EmpObjectType } from "../types/employee.types"
import { TableCellStyle, TableHeadStyle, TableStyle } from "../styles/componentStyles"

interface EmployeeTableProps {
    handleEdit: (id: number) => void,
    handleDelete: (id: number) => void,
    employees: EmpObjectType[]
}
function EmployeeTable({ handleEdit, handleDelete, employees }: EmployeeTableProps) {
    if(employees.length===0)
        return (<h3>No Employees found , Add Some Employees or go to the previous page</h3>)
    return (
        <>
            <Table sx={TableStyle}>
                <TableHead sx={TableHeadStyle}>
                    <TableRow>
                        <TableCell sx={TableCellStyle}>EmployeeId</TableCell>
                        <TableCell sx={TableCellStyle}>EmployeeName</TableCell>
                        <TableCell sx={TableCellStyle}>Designation</TableCell>
                        <TableCell sx={TableCellStyle}>Department</TableCell>
                        <TableCell sx={TableCellStyle}>Salary</TableCell>
                        <TableCell sx={TableCellStyle}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {
                        employees?.map((employee, index) => (
                            <TableRow key={index} >
                                <TableCell>{employee.EmpId}</TableCell>
                                <TableCell>{employee.EmpName}</TableCell>
                                <TableCell>{employee.EmpDesig}</TableCell>
                                <TableCell>{employee.EmpDept}</TableCell>
                                <TableCell>{employee.EmpSal}</TableCell>
                                <TableCell>
                                    <IconButton color='primary' onClick={() => handleEdit(employee.EmpId)}><Edit /></IconButton>
                                    <IconButton color='error' onClick={() => handleDelete(employee.EmpId)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </>
    )
}

export default EmployeeTable
