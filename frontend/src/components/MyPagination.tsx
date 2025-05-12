import { Button } from '@mui/material'
import '../styles/pagination.styles.css'

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
        <div className='pagination'>
            {
                pages.map((page, index) => (
                    <Button key={index} className={page==currentPage?'active':''} onClick={() => setCurrentPage(page)}>{page}</Button>
                ))
            }
        </div>
    )
}

export default MyPagination
