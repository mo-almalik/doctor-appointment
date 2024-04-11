"use client"
import axios from 'axios'
import { getToken } from '../utils/auth.js'


 const baseURL = 'https://doctor-api-la8z.onrender.com/api/v1/'
 getToken() 
 const token = getToken() 

const api= axios.create({baseURL ,headers:{
    token : token
}})


export default api