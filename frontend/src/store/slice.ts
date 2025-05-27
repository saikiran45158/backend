import { createSlice } from "@reduxjs/toolkit"
import { EmpObjectType } from "../types/employee.types"

const state:Array<EmpObjectType>=[]

const myreducer=createSlice({
    name:"employee",
    initialState:state,
    reducers:{
        setEmployees:(state,action)=>{
            const data:EmpObjectType[]=action.payload
            state.length=0
            state.push(...data)
        }
    }
})

export const reducer=myreducer.reducer
export const {setEmployees}=myreducer.actions
