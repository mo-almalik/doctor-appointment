import React from 'react'
import {  Navigate } from 'react-router-dom';
import {  isAuthenticated,  userRole } from './auth.js';



const Role = userRole()




  function UserRouter({children}) {
    if(isAuthenticated() && Role === 'user'){
        
        return children
    }else{
         <Navigate to={'/'}/>

    }

}
 function AdminRouter({children}) {
    if(isAuthenticated() && Role === 'admin'){
        <Navigate to={'/admin'}/>
        return children
        
    }else{
        <Navigate to={'/'}/>
    }
}

 function DoctorRouter({children}) {
    if(isAuthenticated() && Role === 'doctor'){
        return children
    }else{
        <Navigate to={'/'}/>

    }
}

export{
    UserRouter,
    AdminRouter,
    DoctorRouter,
}