import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";

function UserForm({title, userData, onSubmit}){
    const [user, setUser] = useState(userData)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        setUser(userData)
        setIsLoading(false)
    }, [userData])

    useEffect(() => {
        if(isSubmit && Object.keys(formErrors).length === 0){
            try{
                onSubmit(user)
            }
            catch(err){
                setIsSubmit(false)
                console.log(err)
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
    
        if (!age) {
            errors.age = 'Age is required!'
        }
        else if (+age < 0 || +age >99) {
            errors.age = 'Age should be between 0 and 99!'
        }
    
        return errors;
    }
    
    if(isLoading){
        return <div className="flex items-center justify-center min-h-screen"><Spinner /></div>
    }
    return(
        <div className="container">
            <button onClick={() => {navigate(-1)}} className="btn border-gray-600 bg-gray-400 hover:bg-gray-500" >Go back</button>
            <div className="mt-5 md:mt-10 bg-yellow-200 max-w-fit mx-auto px-20 py-10 md:px-10 md:py-15 rounded-lg border-2 border-gray-600 shadow-md mb-10">
                <h2 className="text-center mb-10 text-3xl md:text-4xl font-extrabold">{title}</h2>
                <form className="flex flex-col items-center gap-4 md:gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <div className='flex flex-wrap items-start md:items-center gap-2 justify-between w-60 md:w-120 md:flex-row flex-col'>
                            <label className='text-xl font-semibold' htmlFor="firstName">First name:</label>
                            <input className='input-field'  id='firstName' name='firstName' type="text"
                                value={user.firstName} onChange={handleChange}
                                placeholder="Enter your first name"/>
                        </div>
                        {formErrors.firstName && <p className='text-red-600 self-end'>{formErrors.firstName}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className='flex flex-wrap items-start md:items-center gap-2 justify-between w-60 md:w-120 md:flex-row flex-col'>
                            <label className='text-xl font-semibold' htmlFor="lastName">Last name:</label>
                            <input className='input-field'  id='lastName' name='lastName' type="text"
                                value={user.lastName} onChange={handleChange}
                                placeholder="Enter your last name"/>
                        </div>
                        {formErrors.lastName && <p className='text-red-600 self-end'>{formErrors.lastName}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className='flex flex-wrap items-start md:items-center gap-2 justify-between w-60 md:w-120 md:flex-row flex-col'>
                            <label className='text-xl font-semibold' htmlFor="email">Email:</label>
                            <input className='input-field'  id='email' name='email' type="email"
                                value={user.email} onChange={handleChange}
                                placeholder="Enter your email"/>
                        </div>
                        {formErrors.email && <p className='text-red-600 self-end'>{formErrors.email}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className='flex flex-wrap items-start md:items-center gap-2 justify-between w-60 md:w-120 md:flex-row flex-col'>
                            <label className='text-xl font-semibold' htmlFor="phone">Phone number:</label>
                            <input className='input-field'  id='phone' name='phone' type="tel"
                                value={user.phone} onChange={handleChange}
                                placeholder="Enter your phone number"/>
                        </div>
                        {formErrors.phone && <p className='text-red-600 self-end'>{formErrors.phone}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className='flex flex-wrap items-start md:items-center gap-2 justify-between w-60 md:w-120 md:flex-row flex-col'>
                            <label className='text-xl font-semibold' htmlFor="age">Age:</label>
                            <input className='input-field w-60'  id='age' name='age' type="number"
                                value={user.age} onChange={handleChange}
                                placeholder="Enter you age"
                                min={0} max={99}/>
                        </div>
                        {formErrors.age && <p className='text-red-600 self-end'>{formErrors.age}</p>}
                    </div>
                    
                    <button className="btn mt-10 border-blue-800 bg-blue-500 hover:bg-blue-700" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm