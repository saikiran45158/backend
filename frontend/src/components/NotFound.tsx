import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { boxStyle } from '../styles/componentStyles';

export default function NotFound() {
    return (
        <Box sx={boxStyle}>
            <Typography variant='h4'>404 Not Found</Typography>
            <Typography component='p'>The page you are looking for does not exist.</Typography >
            <Typography component='p'>
                You can go back to the <Link style={{color:'blue'}} to="/">login page</Link>
            </Typography>
        </Box>
    );
};

