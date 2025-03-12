import React, {useState, useRef} from 'react'
import { userService } from '../../services/userService'
import UserCard from './UserCard'
import Header from '../layout/Header'
import {Link} from 'react-router-dom'
import Spinner from '../utils/Spinner'
import useFetch from '../hooks/useFetch'
import UserSearch from './UserSearch'

function UserList(){

    const {data: usersList, isLoading, error} = useFetch(userService.fetchUsers)
    const [foundUsers, setFoundUsers] = useState(null)


    if(isLoading){
        return (<div className='flex items-center justify-center min-h-screen'><Spinner /></div>)
    }

    if(error){
        return (<div>An error occured: {error.message}</div>)
    }

    return(
        <div className='bg-blue-200 min-h-screen'>
            <Header />
            <main className='container'>
                <div className='flex flex-col gap-8'>
                   <div className='flex items-center gap-14'>
                        <h1 className='text-3xl font-bold '>User List</h1>
                        <Link className='btn border-green-800 bg-green-500 hover:bg-green-600' to='/user/add'>Add user</Link>
                   </div>
                   <UserSearch setFoundUsers={setFoundUsers}/>
                </div>
               
               {foundUsers ? 
                (
                    <div>
                        <p className='text-3xl font-bold mb-10'>Search results:</p>
                        {foundUsers.length === 0 && <p className='text-2xl ml-5'>Nothing found</p>}
                        <ul className='flex flex-wrap gap-5 md:gap-10 justify-center pb-20'>
                            {
                                foundUsers.map((user)=> <li key={user.id}>
                                    <UserCard user={user}/>
                                </li>)
                            }
                        </ul>
                    </div>
                )
                :
                (
                    <ul className='flex flex-wrap gap-5 md:gap-10 justify-center pb-20'>
                        {usersList?.users.map((user) => <li key={user.id}>
                            <UserCard user={user}/>
                        </li>)}
                    </ul>
                ) }
                
            </main>
        </div>
    )
}

export default UserList