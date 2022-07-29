import axios from 'axios'

const API_URL = 'http://localhost:5000/auth/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = async(token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
    const response = await axios.post(API_URL + 'logout', config)

    if(response.data){
        localStorage.removeItem('user')
    }

    return response.data

}

// Profile user
const me = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.get(API_URL + 'me', config)

    return response.data
}

const authService = {
    register,
    logout,
    login,
    me
}

export default authService