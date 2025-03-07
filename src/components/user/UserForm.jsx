import { use, useEffect, useState } from "react";
import {Link} from 'react-router-dom'

function UserForm({title, userData, onSubmit}){
    const [user, setUser] = useState(userData)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(()=>{
        setUser(userData)
    }, [])

    useEffect(() => {
        if(isSubmit && Object.keys(formErrors).length === 0){
            try{
                onSubmit(user)
            }
            catch(err){
                setIsSubmit(false)
            }
        }
    }, [formErrors])


    function handleChange(event){
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    function handleSubmit(event){
        event.preventDefault()
        let errors = validate(user)
        setFormErrors(errors)
        setIsSubmit(true)
    }

    function validate(values) {
        const errors = {};
        const { firstName, lastName, email, phone, age } = values;
    
        if (!firstName) {
            errors.firstName = 'First name is required!'
        }
        else if (firstName.length < 2) {
            errors.firstName = 'First name should be at least 2 characters!'
        }
        else if (firstName.length > 20) {
            errors.firstName = 'First name should be no longer than 20 characters!'
        }
    
        if (!lastName) {
            errors.lastName = 'Last name is required!'
        }
        else if (lastName.length < 2) {
            errors.lastName = 'Last name should be at least 2 characters!'
        }
        else if (lastName.length > 20) {
            errors.lastName = 'Last name should be no longer than 20 characters!'
        }
    
        if (!email) {
            errors.email = 'Email is required!'
        }
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Invalid email format!'
        }
    
        if (!phone) {
            errors.phone = 'Phone number is required!'
        }
        else if (!/^\+?\d{10,15}$/.test(phone)) {
            errors.phone = 'Invalid phone number format!'
        }
    
        if (!age) {
            errors.age = 'Age is required!'
        }
        else if (+age < 0 || +age >99) {
            errors.age = 'Age should be between 0 and 99!'
        }
    
        return errors;
    }
    

    return(
        <div>
            <Link to ='/'>Back to the list</Link>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First name:</label>
                    <input  id='firstName' name='firstName' type="text"
                            value={user.firstName} onChange={handleChange}
                            placeholder="Enter your first name"/>
                    {formErrors.firstName && <p>{formErrors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName">Last name:</label>
                    <input  id='lastName' name='lastName' type="text"
                            value={user.lastName} onChange={handleChange}
                            placeholder="Enter your last name"/>
                    {formErrors.lastName && <p>{formErrors.lastName}</p>}
                </div>
                <div>
                    <label htmlFor="firstName">Email:</label>
                    <input  id='email' name='email' type="email"
                            value={user.email} onChange={handleChange}
                            placeholder="Enter your email"/>
                    {formErrors.email && <p>{formErrors.email}</p>}
                </div>
               <div>
                <div>
                        <label htmlFor="phone">Phone number:</label>
                        <input  id='phone' name='phone' type="tel"
                                value={user.phone} onChange={handleChange}
                                placeholder="Enter your phone number"/>
                    {formErrors.phone && <p>{formErrors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input  id='age' name='age' type="number"
                                value={user.age} onChange={handleChange}
                                placeholder="Enter you age"
                                min={0} max={99}/>
                    {formErrors.age && <p>{formErrors.age}</p>}
                    </div>
               </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UserForm