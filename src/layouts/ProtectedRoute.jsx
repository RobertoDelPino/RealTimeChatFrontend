import { Outlet, Navigate } from "react-router-dom"
import useAuth from "@hooks/useAuth"

const ProtectedRoute = () => {
    const { auth, isLoading } = useAuth();
    if(isLoading) return <div className="h-full flex justify-center items-center">Cargando...</div>
    return (
        <>
            {auth._id ? (
                <Outlet/>
            ) : <Navigate to="/" />}
        </>
    )
}

export default ProtectedRoute
