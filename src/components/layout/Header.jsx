import {useState, useEffect} from 'react'
import {authService} from '../../services/authService'

function Header(){
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})

    useEffect(()=>{
        async function getCurrentUser(){
            try{
                const response = await authService.getCurrentUser()
                console.log(response)
                setUser(response)
            }
            catch(err){
                console.error('Error fetching user:', error.response?.data || error.message)
                setError(err)
            }
        }
        getCurrentUser()
    }, [])

    function handleLogout(){
        try{
            authService.logout()
            window.location.reload()
        }
        catch(err){
            setError(err)
        }
    }

    if(error){
        return <div>{error.message}</div>
    }

    return(
        <header>
            <button onClick={handleLogout}>Log out</button>
            {user.firstName} {user.lastName} <img src={user.image} alt="Profile image" />
        </header>
    )
}

export default Header