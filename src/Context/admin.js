
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
    const [doctorAccount ,setDoctorAccount] = useState([]);


    // get all counts
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


//get all appoientment
async function getAllAppoientment() {
  setLoading(true)
  const data = await api.get('/admin/appointments').catch((e)=>{
    handleError(e.response.data.message); 
});
if(data) {
    setAppointment(data?.data.data.docs);
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
    setUsers(data?.data.data.docs)
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
    setDoctors(data?.data.data.docs)
}
  setLoading(false)
}

// get this doctor
async function GetDoctor(id) {
  setLoading(true)
  const data = await api.get(`/admin/doctor/${id}`).catch((e)=>{
    handleError(e.response.data.message); 
});
if(data) {
  setDoctorAccount(data?.data.data)

}
  setLoading(false)
}
  return <AdminContext.Provider value={{
    loading ,counts ,getCount 
  ,appointment ,getAllAppoientment ,getAllDocotrs 
  ,getAllusers ,users ,doctors
   ,GetDoctor,doctorAccount,
   }}>
       {props.children}
    </AdminContext.Provider>
 
};

// export const useAdmin = () => {
//   const context = useContext(AdminContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// }