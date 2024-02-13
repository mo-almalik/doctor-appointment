import React from 'react'
import {  Navigate } from 'react-router-dom';
import {  isAuthenticated, userRole } from './auth.js';



const Role = userRole()


  function UserRouter(props) {
    if(isAuthenticated() && Role === 'user'){
        console.log(Role);
        return props.children
    }else{
        return <Navigate to={'/'}/>

    }

}
 function AdminRouter(props) {
    if(isAuthenticated() && Role === 'admin'){
        return props.children
    }else{
        return <Navigate to={'/'}/>

    }
}

 function DoctorRouter(props) {
    if(isAuthenticated() && Role === 'doctor'){
        return props.children
    }else{
        return <Navigate to={'/'}/>

    }
}

export{
    UserRouter,
    AdminRouter,
    DoctorRouter,
}