import React, {useState, useEffect} from 'react'
import { userService } from '../services/userService'
import { useParams } from 'react-router'
import {Link} from 'react-router-dom'

function UserDetails(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})
    const params = useParams()
    const {userId} = params    

    useEffect(()=>{
        fetchUser()
    }, [])

    async function fetchUser(){
        setIsLoading(true)
        try{
            const response = await userService.fetchuserById(userId)
            console.log(response);
            setUser(response)
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
            <Link to ='/'>Back to the list</Link>
            <p>{user?.firstName} {user?.lastName}</p>
            <p>Age: {user?.age}</p> 
            <p>Email: {user?.email}</p>
            <p>Phone number: {user?.phone}</p>
            <p>Address: {user.address?.address}, {user.address?.city}, 
                        {user.address?.country}, {user.address?.state} ({user.address?.stateCode}), {user.address?.postalCode}</p>
            <img src={user?.image} alt="User profile picture" />
        </div>
    )
}

export default UserDetails