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
        <div>
            <Header />
            <div>
                <h1>User List</h1>
                <Link to='/user/add'>Add user</Link>
            </div>
            <ul>
                {users.map((user) => <li key={user.id}>
                    <UserCard user={user}/>
                </li>)}
            </ul>
        </div>
    )
}

export default UserList