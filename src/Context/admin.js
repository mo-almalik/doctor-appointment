
import { createContext, useContext, useState } from 'react';
import api from '../services/api.js';
import { useError } from './error.js';



export const AdminContext = createContext();

export function AdminProvider(props) {
    const { handleError} = useError()
    const [loading ,setLoading] = useState(false)
    const [counts ,setCounts] = useState({})
    const [appointment, setAppointment] = useState([]);
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);


async function getCount() {
  setLoading(true)
  const data = await api.get('/admin/total/counts').catch((e)=>{
    handleError(e.response.data.message); 
  
});
if(data) {
setCounts(data?.data.data)
}

  setLoading(false)
}


async function getAllAppoientment() {
  setLoading(true)
  const data = await api.get('/admin/appointments').catch((e)=>{
    handleError(e.response.data.message); 
});
if(data) {
    setAppointment(data?.data.data)
}
  setLoading(false)
}

// all users
async function getAllusers() {
  setLoading(true)
  const data = await api.get('/admin/users').catch((e)=>{
    handleError(e.response.data.message); 
});
if(data) {
    setUsers(data?.data.data)
}
  setLoading(false)
}


// get all doctors
async function getAllDocotrs() {
  setLoading(true)
  const data = await api.get('/admin/doctors').catch((e)=>{
    handleError(e.response.data.message); 
});
if(data) {
    setDoctors(data?.data.data)
}
  setLoading(false)
}
  return <AdminContext.Provider value={{loading ,counts ,getCount ,appointment ,getAllAppoientment ,getAllDocotrs ,getAllusers ,users ,doctors}}>
       {props.children}
    </AdminContext.Provider>
 
};

