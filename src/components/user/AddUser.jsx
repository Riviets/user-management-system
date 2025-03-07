import { useState } from "react";
import UserForm from "./UserForm";

function AddUser(){
    const userData = {firstName: '', lastName: '', email: '', phone: '', age: ''}
    async function handleAddUser(userData){
        console.log(userData);
    }
    return(
        <div>
            <UserForm title="Add User" userData={userData} onSubmit={handleAddUser}/>
        </div>
    )
}

export default AddUser