import React from 'react'
import {Link} from 'react-router-dom'

function UserCard({user}){

    return(
        <div className='flex flex-col border-2 px-3 md:px-10 py-4 md:py-7 shadow-lg rounded-sm md:rounded-md bg-yellow-200'>
            <p className='font-semibold text-lg mb-2 w-70'>{user.firstName} {user.lastName}, {user.age}</p>
            <p className='text-sm text-gray-600 mb-3 md:mb-5'>Email: {user.email}</p>
            <div className='flex items-center justify-center'>
                <Link className='btn border-purple-800 bg-purple-500 hover:bg-purple-700' to={`/user/${user.id}`} >View Details</Link>
            </div>
        </div>
    )
}

export default UserCard