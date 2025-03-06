import React, {useState, useEffect} from 'react'
import { authService } from '../services/authService'

function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError(null)
            const response = await authService.authenticateUser(username, password)
            localStorage.setItem('accessToken', response?.accessToken)
        }
        catch(err){
            setError(err)
        }
    }

    return(
        <div>
            <h1>Authentification</h1>
            {error && error.message}
            <form action="POST" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input  id='username' type="text"
                        placeholder='Enter your username'
                        value={username} onChange={handleUsernameChange}/>
                <label htmlFor="password">Password:</label>
                <input  id='password' type="password"
                        placeholder='Enter your password'
                        value={password} onChange={handlePasswordChange}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default LoginPage