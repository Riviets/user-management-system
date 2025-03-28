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

    function handleBack(){
        setFoundUsers(null)
        setQuery('')
    }

    if(isLoading) return <div className='flex items-center justify-center min-h-screen'><Spinner /></div>

    if(error) return <div>An error occured: {error.message}</div>

    return(
        <div className='flex flex-wrap items-center gap-2 md:gap-8 mb-20'>
            <p className='text-lg md:text-2xl font-bold'>Search users:</p>
            <div className='flex flex-wrap gap-2'>
                <input value={query} onChange={handleChange} className='input-field font-medium text-md' type="text"/>
                <button onClick={handleSearch} className='btn bg-blue-500 hover:bg-blue-700 border-blue-800'>Search</button>
                <button onClick={handleBack} className='btn border-gray-600 bg-gray-400 hover:bg-gray-500'>Back</button>
            </div>
        </div>
    )
}

export default UserSearch