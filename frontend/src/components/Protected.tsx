import { Navigate, Outlet } from "react-router-dom";

export default function Protected({ isLoggedIn }: { isLoggedIn: string | null }) {
    
    return isLoggedIn ? <Outlet /> : <Navigate to={'/'}></Navigate>
}



