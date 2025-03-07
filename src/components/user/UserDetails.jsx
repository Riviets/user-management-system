import React, {useState, useEffect} from 'react'
import { userService } from '../../services/userService'
import { useParams } from 'react-router'
import {Link} from 'react-router-dom'
import Header from '../layout/Header'
import ModalConfirm from '../layout/ModalConfirm'

function UserDetails(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})
    const params = useParams()
    const {userId} = params    
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(()=>{
        fetchUser()
    }, [])

    async function fetchUser(){
        setIsLoading(true)
        try{
            const response = await userService.fetchuserById(userId)
            setUser(response)
        }
        catch(err){
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    } 

    function handleDelete(id){
        setIsModalOpened(true)
        setSelectedUserId(id)
    }

    async function confirmDelete(){
        try{
            const response = await userService.deleteUser(selectedUserId)
            console.log(response.status);
        }
        catch(error){
            console.log(error); 
        }
    }

    function cancelDelete(){
        setIsModalOpened(false)
        console.log('canceled');
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
            <Link to ='/'>Back to the list</Link>
            {isModalOpened && <ModalConfirm isOpened={isModalOpened} message = "delete this user" onConfirm={confirmDelete} onCancel={cancelDelete}/>}
            <p>{user?.username}</p>
            <p>{user?.firstName} {user?.lastName}</p>
            <p>Age: {user?.age}</p> 
            <p>Email: {user?.email}</p>
            <p>Phone number: {user?.phone}</p>
            <p>Address: {user.address?.address}, {user.address?.city}, 
                        {user.address?.country}, {user.address?.state} ({user.address?.stateCode}), {user.address?.postalCode}</p>
            {user.image && <img src={user?.image} alt="User profile picture" />}

            <div>
                <Link to={`/user/edit/${user?.id}`}>Edit</Link>
                <button onClick={()=>handleDelete(user.id)}>Delete</button>
            </div>
        </div>
    )
}

export default UserDetails