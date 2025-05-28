import { Button, Typography } from "@mui/material"
import { FallbackProps } from "react-error-boundary"
import { useNavigate } from "react-router-dom"

const FallBack=({resetErrorBoundary}:FallbackProps)=>{
    const navigate=useNavigate()
    return (

        <>
            <center>
            <Typography variant='h4'>Error occured click on login.</Typography>
            <Button variant='text' onClick={()=>{
                navigate('/')
                resetErrorBoundary()
            }}>login</Button>
            </center>
        </>
    )
}

export default FallBack