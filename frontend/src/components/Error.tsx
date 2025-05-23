import { Box, Typography } from "@mui/material"

type err={
    errorMsg:string
}
export default function Error(props:err){
    return (
        <Box>
            <Typography sx={{color:'red'}} component='span'>{props.errorMsg}</Typography>
        </Box>
    )
}