import {useState, useEffect} from 'react'
import { userService } from '../../services/userService'
import Spinner from '../utils/Spinner'

function UserSearch({setFoundUsers}){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')

    function handleChange(event){
        setQuery(event.target.value)
    }

    async function handleSearch(){
        try{
            setIsLoading(true)
            const response = await userService.searchUsers(query)
            setFoundUsers(response.data.users)
        }
        catch(err){
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    if(isLoading) return <div className='flex items-center justify-center min-h-screen'><Spinner /></div>

    if(error) return <div>An error occured: {error.message}</div>

    return(
        <div className='flex items-center gap-8 mb-20'>
            <p className=' text-2xl font-bold'>Search users:</p>
            <div className='flex gap-2'>
                <input value={query} onChange={handleChange} className='input-field font-medium text-md' type="text"/>
                <button onClick={handleSearch} className='btn bg-blue-500 hover:bg-blue-700 border-blue-800'>Search</button>
            </div>
        </div>
    )
}

export default UserSearch