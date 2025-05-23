import { Box, Button } from '@mui/material'
import { activeButtonStyle, paginationStyle } from '../styles/paginationStyles'

interface MyPaginationProps {
    employeesSize: number,
    currentPage: number,
    setCurrentPage: (currentPage: number) => void
}

function MyPagination({ employeesSize,currentPage, setCurrentPage }: MyPaginationProps) {

    const pages: number[] = []
    for (let i = 1; i <= Math.ceil(employeesSize / 5); i++)
        pages.push(i)
    return (
        <Box component='div' sx={paginationStyle}>
            {
                pages.map((page, index) => (
                    <Button key={index} sx={{
                        ...(page === currentPage ? activeButtonStyle : {})
                      }} onClick={() => setCurrentPage(page)}>{page}</Button>
                ))
            }
        </Box>
    )
}

export default MyPagination
