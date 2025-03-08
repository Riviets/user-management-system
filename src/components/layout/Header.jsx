import {useState, useEffect} from 'react'
import {authService} from '../../services/authService'

function Header(){
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})

    useEffect(()=>{
        async function getCurrentUser(){
            try{
                const response = await authService.getCurrentUser()
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
        <header className='bg-blue-300 py-3 border-b-3 border-b-blue-700 mb-5 md:mb-15'>
          <div className='container flex justify-between items-center gap-4'>
            <button className='btn border-red-800 bg-red-500 hover:bg-red-700' 
            onClick={handleLogout}>Log out</button>
                <div className='flex items-center gap-8'>
                    <p className='font-semibold text-xl'>{user.firstName} {user.lastName} </p>
                    <img className='bg-white p-3 rounded-full w-20 border-3 border-gray-600 shadow-xl hidden sm:flex' src={user.image} alt="Profile image" />
                </div>
          </div>
        </header>
    )
}

export default Header