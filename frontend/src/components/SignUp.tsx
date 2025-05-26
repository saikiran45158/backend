import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { userType } from "../types/user.types";
import { signup } from "../services/signupService";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { fromStyle, LoginStyle } from "../styles/componentStyles";

export default function SignUp() {
    const userRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    async function handleSubmit(eve: { preventDefault: () => void; }) {
        eve.preventDefault()
        const data: userType = { user: userRef.current?.value as string, password: passRef.current?.value as string }
        if(data.password.length<6){
            setError('password has minimum 6 characters')
            return window.setTimeout(()=>setError(''),4000)
        }
        try { 
            await signup(data);
            window.alert('Signup sucessful ,redirecting to login page')
            navigate('/')
        }
        catch (err) {
            console.log(err)
            if (typeof err === 'object')
                setError((err as { message: string }).message)
        }
        window.setTimeout(() => setError(''), 4000)
    }
    return (
        <Box sx={LoginStyle}>
            <Box>
                <Box component='form' onSubmit={handleSubmit} sx={fromStyle}>
                    <Typography variant="h5"  sx={{fontWeight: "bold"}}>SignUp</Typography>
                    <Error errorMsg={error} />
                    <TextField inputRef={userRef} type='text' required label='Enter username'></TextField>
                    <TextField inputRef={passRef} type='password' required label='Enter password'></TextField>
                    <Button variant='contained' type='submit'>Sign Up</Button>
                    <Typography component='span'>Have an account ?<Button onClick={() => navigate('/')}  variant='text'>login</Button></Typography>
                </Box>
            </Box>
        </Box>
    )
}