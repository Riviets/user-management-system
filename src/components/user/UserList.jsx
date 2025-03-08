import React, {useState, useEffect} from 'react'
import { userService } from '../../services/userService'
import UserCard from './UserCard'
import Header from '../layout/Header'
import {Link} from 'react-router-dom'

function UserList(){

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
    }, [])

    async function fetchUsers(){
        setIsLoading(true)
        try{
            const response = await userService.fetchUsers()
            setUsers(response.users)
        }
        catch(err){
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    if(isLoading){
        return (<div>Loading...</div>)
    }

    if(error){
        return (<div>An error occured: {error.message}</div>)
    }

    return(
        <div className='bg-blue-200 min-h-screen'>
            <Header />
            <main className='container'>
                <div className='flex max-w-sm justify-between py-10 items-center mb-5 md:mb-15 md:ml-20'>
                    <h1 className='text-3xl font-bold '>User List</h1>
                    <Link className='btn border-green-800 bg-green-500 hover:bg-green-600' to='/user/add'>Add user</Link>
                </div>
                <ul className='flex flex-wrap gap-5 md:gap-10 justify-center pb-20'>
                    {users.map((user) => <li key={user.id}>
                        <UserCard user={user}/>
                    </li>)}
                </ul>
            </main>
        </div>
    )
}

export default UserList