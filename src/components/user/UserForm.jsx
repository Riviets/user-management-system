import { useEffect, useState } from "react";

function UserForm({title, userData, onSubmit}){
    const [user, setUser] = useState(userData)

    useEffect(()=>{
        setUser(userData)
    }, [])

    function handleChange(event){
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    function handleSubmit(event){
        event.preventDefault()
        onSubmit(user)
    }

    return(
        <div>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First name:</label>
                    <input  id='firstName' name='firstName' type="text"
                            value={user.firstName} onChange={handleChange}
                            placeholder="Enter your first name"/>
                </div>
                <div>
                    <label htmlFor="lastName">Last name:</label>
                    <input  id='lastName' name='lastName' type="text"
                            value={user.lastName} onChange={handleChange}
                            placeholder="Enter your last name"/>
                </div>
                <div>
                    <label htmlFor="firstName">Email:</label>
                    <input  id='email' name='email' type="email"
                            value={user.email} onChange={handleChange}
                            placeholder="Enter your email"/>
                </div>
               <div>
                <div>
                        <label htmlFor="phone">Phone number:</label>
                        <input  id='phone' name='phone' type="tel"
                                value={user.phone} onChange={handleChange}
                                placeholder="Enter your phone number"/>
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input  id='age' name='age' type="number"
                                value={user.age} onChange={handleChange}
                                placeholder="Enter you age"
                                min={0} max={99}
                                />
                    </div>
               </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UserForm