import { JSX, useRef, useState } from "react";
import { EmpObjectType } from "../types/employee.types";
import EmployeeObject from "../services/employeeService";
import React from "react";
import Error from "./Error";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { boxStyle, fromStyle } from "../styles/componentStyles";

export default function Update(props: { id: number; }): JSX.Element {
    const [error, setError] = useState('')
    const ename = useRef<HTMLInputElement>(null);
    const edesig = useRef<HTMLInputElement>(null);
    const edept = useRef<HTMLInputElement>(null);
    const esal = useRef<HTMLInputElement>(null);
    const navigate=useNavigate()
    async function fetchUserData(id: number) {
        try{
        const EmpData: Partial<EmpObjectType> = await EmployeeObject.getEmployee(Number(id))
        ename.current!.value = ''
        edesig.current!.value = ''
        edept.current!.value = ''
        esal.current!.value = ''
        ename.current!.value = EmpData.EmpName!
        edesig.current!.value = EmpData.EmpDesig!
        edept.current!.value = EmpData.EmpDept!
        esal.current!.value = EmpData.EmpSal!.toString();
        }
        catch(err){
            if (typeof err === 'object') {
                const errMsg = (err as { message: string }).message
                if(errMsg.localeCompare('session expired please relogin')===0){
                    window.alert(errMsg)
                    navigate('/')
                }
                else
                    setError(errMsg);
            }
        }
    }
    if(props.id>0)
        fetchUserData(props.id)
    async function handleSubmit(eve: React.FormEvent) {
        eve.preventDefault();
        if (!ename.current || !edesig.current || !edept.current || !esal.current) {
            console.log("Enter values");
            window.alert('enter all values')
            return;
        }
        if (ename.current.value === '' || edesig.current.value === '' || edept.current.value === '' || esal.current.value === '') {
            setError('enter all values')
            window.setTimeout(() => setError(''), 4000)
            return;
        }
        const data = {
            EmpId: Number(props.id),
            EmpName: ename.current.value,
            EmpDesig: edesig.current?.value,
            EmpDept: edept.current.value,
            EmpSal: Number(esal.current.value)
        };
       try{
        await EmployeeObject.editEmployee(data.EmpId, data)
       }
       catch(err){
        if (typeof err === 'object') {
            const errMsg = (err as { message: string }).message
            if(errMsg.localeCompare('session expired please relogin')===0){
                window.alert(errMsg)
                navigate('/')
            }
            else
                setError(errMsg);
            window.setTimeout(() => setError(''), 4000)
        }
       }
    }

    return (
        <Box sx={boxStyle}>
            <Box component='form' onSubmit={handleSubmit} sx={fromStyle}>
                <Error errorMsg={error}></Error>
                <TextField required label='Enter Name' inputRef={ename}></TextField>
                <TextField required label='Enter Designation' inputRef={edesig}></TextField>
                <TextField required label='Enter Department' inputRef={edept}></TextField>
                <TextField required label='Enter Salary' type="number" inputRef={esal}></TextField>
                <Button type='submit' variant='contained'>Update</Button>
            </Box>
        </Box>
    );
}

