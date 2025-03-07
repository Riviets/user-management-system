import { useEffect, useState } from "react"
import UserForm from "./UserForm"
import { useParams } from "react-router-dom"
import { userService } from "../../services/userService"

function EditUser(){
    const params = useParams()
    const {id} = params
    const [user, setUser] = useState({firstName: '', lastName: '', email: '', phone: '', age: ''})
    const [error, setError] = useState(null)

    useEffect(()=>{
        async function getUserInfo(){
            try{
                const response = await userService.fetchuserById(id)
                setUser(response)
            }
            catch(error){
                setError(error)
            }
        }
        getUserInfo()
    }, [])

    async function handleEdit(){
        try{
            const response = await userService.editUser(id)
            console.log(response);
        }
        catch(error){
            console.log(error.message);
        }
    }

    if(error){
        return <div>An error occured: {error.message}</div>
    }
    return(
        <div>
            <UserForm title="Edit form" userData={user} onSubmit={handleEdit}/>
        </div>
    )
}

export default EditUser