import axios from 'axios'

const API_URL = 'https://dummyjson.com';

export const userService = {
    fetchUsers: async () => {
        try{
            const response = await axios.get(`${API_URL}/users`)
            return response.data
        }
        catch(error){
            throw error
        }
    },
    fetchuserById: async (userId) => {
        try{
            const response = await axios.get(`${API_URL}/users/${userId}`)
            return response.data
        }
        catch(error){
            throw error
        }
    }
}