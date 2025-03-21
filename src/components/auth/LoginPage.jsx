import React, {useState, useEffect} from 'react'
import { authService } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

function LoginPage(){
    const initialValues = {username: '', password: ''}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [authError, setAuthError] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()

    function handleChange(event){
        const {name, value} = event.target
        setFormValues({...formValues, [name]: value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const errors = validate(formValues)
        setFormErrors(errors)
        setAuthError('')
        setIsSubmit(true)
    }

    useEffect(() =>{
        async function authenticate(){
            if(isSubmit && Object.keys(formErrors).length === 0){
                try{
                    const response = await authService.authenticateUser(formValues.username, formValues.password)
                    localStorage.setItem('accessToken', response?.accessToken)
                    navigate('/')
                }
                catch(err){
                    if(err.response && err.response.status === 400){
                        setAuthError('Wrong email or password!')
                    }
                    setIsSubmit(false)
                }
            }
        }
        authenticate()
    }, [formErrors, isSubmit])

    function validate(values){
        const errors = {}
        const {username, password} = values
        if(!username){
            errors.username = 'Username is required!'
        }
        else if(username.length < 4){
            errors.username = 'Username should be at least 4 characters!'
        }
        else if(username.length > 12){
            errors.username = 'Username should be no longer than 12 characters!'
        }

        if(!password){
            errors.password = 'Password is required!'
        }
        else if(password.length < 8){
            errors.password = 'Password should be at least 8 characters!'
        }
        else if( password.length > 16){
            errors.password = 'Password should be no longer that 16 characters!'
        }
        return errors
    }

    return(
        <div className='flex justify-center items-center min-h-screen bg-blue-200 px-10 py-10'>
            <div className='flex flex-col md:flex-row border-3 border-solid border-gray-600 rounded-lg bg-white -mt-5 shadow-lg'>
                <div className='hidden md:flex md:w-1/2 pt-35 bg-purple-600 px-10 rounded-l-md'>
                    <p className='font-semibold text-5xl leading-snug text-white'>Welcome Back!</p>
                </div>
                <div className='px-8 py-20 w-full'>
                    <p className='text-3xl font-bold mb-5 text-center'>Login</p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-8'>
                            <div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-xl font-medium ml-1' htmlFor="username">Username:</label>
                                    <input className='input-field' id='username' type="text" name='username'
                                        placeholder='Enter your username'
                                        value={formValues.username} onChange={handleChange}/>
                                </div>
                                {formErrors.username && <p className='text-red-600'>{formErrors.username}</p>}
                            </div>
                            <div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-xl font-medium ml-1' htmlFor="password">Password:</label>
                                    <input className='input-field' id='password' type="password" name='password'
                                        placeholder='Enter your password'
                                        value={formValues.password} onChange={handleChange}/>
                                </div>
                                {formErrors.password && <p className='text-red-600'>{formErrors.password}</p>}
                            </div>
                        {authError && <p className='text-red-600'>{authError}</p>}
                        </div>
                        <div className='flex justify-center'>
                            <button type='submit' className='font-semibold text-white bg-purple-600 px-8 text-2xl hover:scale-110 hover:bg-purple-700 mt-8
                                                             rounded-3xl py-1 border border-purple-800 border-3 cursor-pointer transition duration-300'>
                                    Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage