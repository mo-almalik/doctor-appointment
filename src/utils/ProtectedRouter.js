import React from 'react'
import {  Navigate } from 'react-router-dom';
import {  isAuthenticated,  userRole } from './auth.js';



const Role = userRole()

console.log('pro');


  function UserRouter({children}) {
    if(isAuthenticated() ){
        if(Role === 'user'){
             return  children
            }

        else{
         <Navigate to={'/'}/>

    }
    }

}
 function AdminRouter(props) {
    if(isAuthenticated() && Role === 'admin'){
        return props.children
        
    }else{
        return   <Navigate to={'/'}/>
    }
}

 function DoctorRouter(props) {
    if(isAuthenticated() && Role === 'doctor'){
        return props.children
    }else{
     return  <Navigate to={'/'}/>

    }
}

export{
    UserRouter,
    AdminRouter,
    DoctorRouter,
}