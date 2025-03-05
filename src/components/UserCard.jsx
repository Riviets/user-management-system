import React from 'react'

function UserCard({user}){

    function handleViewDetails(){
        console.log(`detaild button clicked for ${user.firstName}`)
    }
    return(
        <div>
            {user.firstName} {user.lastName}
            <br />
            {user.age} years, <br />
            Email: {user.email}
            <button onClick={handleViewDetails}>View Details</button>
        </div>
    )
}

export default UserCard