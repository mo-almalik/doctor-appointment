import React from 'react'
import {  Navigate } from 'react-router-dom';
import {  isAuthenticated, user } from './auth.js';
import NotFound from '../components/common/NotFound.jsx';



const Role = user()




  function UserRouter(props) {
    if(isAuthenticated() && Role.role === 'user'){
        
        return props.children
    }else{
        return <Navigate to={'/'}/>

    }

}
 function AdminRouter(props) {
    if(isAuthenticated() && Role.role === 'admin'){
        return props.children
    }else{
        return <NotFound/>

    }
}

 function DoctorRouter(props) {
    if(isAuthenticated() && Role.role === 'doctor'){
        return props.children
    }else{
        return <NotFound/>

    }
}

export{
    UserRouter,
    AdminRouter,
    DoctorRouter,
}