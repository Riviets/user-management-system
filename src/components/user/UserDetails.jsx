import React, {useState, useEffect} from 'react'
import { userService } from '../../services/userService'
import { useParams } from 'react-router'
import {Link} from 'react-router-dom'
import Header from '../layout/Header'
import ModalConfirm from '../layout/ModalConfirm'
import { useNavigate } from 'react-router-dom'
import Spinner from '../utils/Spinner'

function UserDetails(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})
    const params = useParams()
    const {userId} = params    
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const navigate = useNavigate()

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
            console.log(`Server returned status ${response.status} for user id ${userId}`);
            setIsModalOpened(false)
            navigate('/')
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
        return (<div className='flex items-center justify-center min-h-screen'><Spinner /></div>)
    }

    if(error){
        return (<div>An error occured: {error.message}</div>)
    }
    return(
        <div className='bg-blue-200 min-h-screen'>
            <Header />
            <div className='container'>
                <Link className='btn border-gray-600 bg-gray-400 hover:bg-gray-500' to ='/'>Back to the list</Link>
               <div className='flex flex-col gap-15 border-2 border-gray-600 rounded-md shadow-lg mt-5 md:mt-15 p-5 md:p-10 bg-yellow-200 mb-10'>
                    <div className='flex gap-3 md:gap-10 items-center'>
                            {user.image && <img src={user?.image} alt="User profile picture" className='w-24 md:w-44 bg-white rounded-full p-5 border-4 border-gray-600 shadow-xl'/>}
                            <div className='flex flex-col gap-1'>
                                <p className='font-extrabold lg:text-4xl text-2xl'>{user?.username}</p>
                                <p className='lg:text-lg text-sm text-gray-600 font-medium'>{user?.firstName} {user?.lastName}</p>
                            </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p className='text-md md:text-xl font-medium'>Age: {user?.age}</p> 
                        <p className='text-md md:text-xl font-medium'>Email: {user?.email}</p>
                        <p className='text-md md:text-xl font-medium'>Phone number: {user?.phone}</p>
                        <p className='text-md md:text-xl font-medium'>Address: {user.address?.address}, {user.address?.city}, 
                                    {user.address?.country}, {user.address?.state} ({user.address?.stateCode}), {user.address?.postalCode}</p>

                        <div className='flex gap-6 justify-between sm:justify-start mt-4'>
                            <Link className='btn border-blue-800 bg-blue-500 hover:bg-blue-700' to={`/user/edit/${user?.id}`}>Edit</Link>
                            <button className='btn border-red-800 bg-red-500 hover:bg-red-700' onClick={()=>handleDelete(user.id)}>Delete</button>
                        </div>
                    </div>
               </div>
            </div>
            {isModalOpened && <ModalConfirm isOpened={isModalOpened} message = "delete this user" onConfirm={confirmDelete} onCancel={cancelDelete}/>}
        </div>
    )
}

export default UserDetails