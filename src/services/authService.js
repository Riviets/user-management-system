import axios from 'axios'

const API_URL = 'https://dummyjson.com';

export const authService = {
    authenticateUser: async (username, password, expiresInMins = 15) => {
        try{
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password,
                expiresInMins,
            },
            {
                headers: {'Content-Type': 'application/json'}
            })
            return response.data
        }
        catch(error){
            throw error
        }
    },
    logout: () => {
        localStorage.removeItem('accessToken')
    },
}