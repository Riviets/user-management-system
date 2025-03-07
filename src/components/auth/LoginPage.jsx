import React, {useState, useEffect} from 'react'
import { authService } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

function LoginPage(){
    const initialValues = {username: '', password: ''}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [authError, setAuthError] = useState(null)
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
        setAuthError(null)
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
                    setAuthError(err)
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
        <div>
            <h1>Authentification</h1>
            {authError && <p>{authError.message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input  id='username' type="text" name='username'
                        placeholder='Enter your username'
                        value={formValues.username} onChange={handleChange}/>
                {formErrors.username && <p>{formErrors.username}</p>}
                <br />
                <label htmlFor="password">Password:</label>
                <input  id='password' type="password" name='password'
                        placeholder='Enter your password'
                        value={formValues.password} onChange={handleChange}/>
                {formErrors.password && <p>{formErrors.password}</p>}
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default LoginPage