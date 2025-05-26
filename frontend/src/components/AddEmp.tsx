import { useRef, JSX, useState } from "react"
import React from "react";
import Error from "./Error";
import EmployeeObject from "../services/employeeService";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fromStyle } from "../styles/componentStyles";

export default function AddEmp(): JSX.Element {
    const [error, setError] = useState('') 
    const eid: React.RefObject<HTMLInputElement | null> = useRef(null)
    const ename: React.RefObject<HTMLInputElement | null> = useRef(null)
    const edesig: React.RefObject<HTMLInputElement | null> = useRef(null)
    const edept: React.RefObject<HTMLInputElement | null> = useRef(null)
    const esal: React.RefObject<HTMLInputElement | null> = useRef(null)
    const navigate=useNavigate()
    
    async function handleSubmit(eve: { preventDefault: () => void; }) {
        setError('')
        eve.preventDefault();
        if (!eid.current || !ename.current || !edesig.current || !edept.current || !esal.current) {
            return;
        }
        const data = { EmpId: Number(eid.current.value), EmpName: ename.current.value, EmpDesig: edesig.current.value, EmpDept: edept.current.value, EmpSal: Number(esal.current.value) }
        if(data.EmpId<1){
            setError('Employee ID must be greater than 1')
            return window.setTimeout(()=>setError(''),3000)
        }

        try {
            setError('')
            await EmployeeObject.addEmployee(data)
            eid.current.value = '';
            ename.current.value = '';
            edesig.current.value = '';
            edept.current.value = '';
            esal.current.value = '';
        }
        catch (err: unknown) {
            if (typeof err === 'object') {
                const errMsg = (err as { message: string }).message
                if(errMsg.localeCompare('session expired please relogin')===0){
                    window.alert(errMsg)
                    navigate('/')
                }
                else
                    setError(errMsg);
            }
            window.setTimeout(()=>setError(''),4000)
        }
    }
    return (<Box>
        <Box component='form' onSubmit={handleSubmit} sx={fromStyle}>
            <Error errorMsg={error}></Error>
            <TextField required label='Enter Id' type="number" inputRef={eid}></TextField>
            <TextField required label='Enter Name' inputRef={ename}></TextField>
            <TextField required label='Enter Designation' inputRef={edesig}></TextField>
            <TextField required label='Enter Department' inputRef={edept}></TextField>
            <TextField required label='Enter Salary' type="number" inputRef={esal}></TextField>
            <Button type='submit' variant='contained'>Add Employee</Button>
        </Box>
    </Box>)
}
