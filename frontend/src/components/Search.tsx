import { SearchOutlined } from "@mui/icons-material"
import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { EmpObjectType } from "../types/employee.types"
import { useSelector } from "react-redux"
import { storeType } from "../store/store"

interface searchProps {
    setEmployees: (employees: EmpObjectType[]) => void
}

function Search({ setEmployees }: searchProps) {
    const [search, setSearch] = useState('')
    const stateEmployees = useSelector((state: storeType) => state.employees)
    useEffect(() => {
        const employees: EmpObjectType[] = []
        stateEmployees.forEach((employee) => {
            if (employee.EmpName.toLowerCase().startsWith(search.toLowerCase())) {
                employees.push(employee)
            }
        })
        setEmployees(employees)
    }, [search, setEmployees, stateEmployees])
    return (
        <>
            <TextField variant='outlined' placeholder="enter name" label={<SearchOutlined />} onChange={(eve) => setSearch(eve.target.value)}></TextField>
        </>
    )
}

export default Search
