import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { boxStyle } from '../styles/componentStyles';

export default function NotFound() {
    return (
        <Box sx={boxStyle}>
            <h2>404 Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <p>
                You can go back to the <Link style={{color:'blue'}} to="/">login page</Link>
            </p>
        </Box>
    );
};

