"use client"
import axios from 'axios'
import { getToken } from '../utils/auth.js'

 const baseURL = 'http://localhost:3001/api/v1/'
 
 const token = getToken() 

const api= axios.create({baseURL ,headers:{
    token : token
}})

export default api