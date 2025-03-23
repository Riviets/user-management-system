import { Navigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import { authService } from "../../services/authService";

function ProtectedRoute({children}){
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(()=>{
        async function verifyToken(){
            const token = localStorage.getItem('accessToken')
            if(!token){
                setIsAuthenticated(false)
                setIsLoading(false)
                return
            }

            try{
                const userData = await authService.getCurrentUser()
                setIsAuthenticated(true)
            }
            catch(error){
                console.log(error);
                localStorage.removeItem('accessToken')
                setIsAuthenticated(false)
            }
            finally{
                setIsLoading(false)
            }
        }
        verifyToken()
    }, [])

    if(isLoading) return (<div>Loading...</div>)
    if(isAuthenticated){
        return children
    }
    return <Navigate to='/login'/>
}

export default ProtectedRoute