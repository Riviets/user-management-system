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
    },
    addUser: async (userData) => {
        try{
            const response = await axios.post(`${API_URL}/users/add`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data
        }
        catch(error){
            throw error
        }
    },
    editUser: async (id, userData) => {
        try{
            const response = await axios.patch(`${API_URL}/users/${id}`, userData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data
        }
        catch(error){
            throw error
        }
    },
    deleteUser: async (id) => {
        try{
            const response = await axios.delete(`${API_URL}/users/${id}`)
            return response
        }
        catch(error){
            throw error
        }
    }
}