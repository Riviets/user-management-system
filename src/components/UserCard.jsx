import React from 'react'
import {Link} from 'react-router-dom'

function UserCard({user}){

    return(
        <div>
            {user.firstName} {user.lastName}
            <br />
            {user.age} years, <br />
            Email: {user.email} <br />
            <Link to={`/user/${user.id}`} >View Details</Link>
        </div>
    )
}

export default UserCard