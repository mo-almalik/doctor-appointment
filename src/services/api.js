
import axios from 'axios'
import { getToken } from '../utils/auth.js'

//'https:////doctor-api-cbmb.onrender.com/api/v1/'

 const baseURL = 'http://localhost:3001/api/v1'
 getToken() 
 const token = getToken() 

const api= axios.create({baseURL ,headers:{
    token : token
}})


export default api