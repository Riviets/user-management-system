import UserForm from "./UserForm";
import { userService } from "../../services/userService";

function AddUser(){
    const userData = {firstName: '', lastName: '', email: '', phone: '', age: ''}
    async function handleAddUser(userData){
        try{
            const newUser = await userService.addUser(userData)
            console.log(newUser)
        }
        catch(error){
            console.log(error.message);
        }
    }
    return(
        <div>
            <UserForm title="Add User" userData={userData} onSubmit={handleAddUser}/>
        </div>
    )
}

export default AddUser