import React from 'react'
import {  Navigate } from 'react-router-dom';
import {  isAuthenticated,  userRole } from './auth.js';

import AdminHome from '../components/admin/AdminHome.jsx';
import DoctorHome from '../components/doctor/DoctorHome.jsx';



const Role = userRole()




  function UserRouter(props) {
    if(isAuthenticated() && Role === 'user'){
        
        return props.children
    }else{
         <Navigate to={'/'}/>

    }

}
 function AdminRouter(props) {
    if(isAuthenticated() && Role === 'admin'){
        <Navigate to={'/admin'}/>
        return props.children
        
    }else{
        return <AdminHome/>

    }
}

 function DoctorRouter(props) {
    if(isAuthenticated() && Role === 'doctor'){
        return props.children
    }else{
        return <DoctorHome/>

    }
}

export{
    UserRouter,
    AdminRouter,
    DoctorRouter,
}