import React, { useEffect, useState } from 'react'
import api from '../../services/api.js';
import { useParams } from 'react-router-dom';

export default function AdminDoctorDetails() {
  const [doctorAccount ,setDoctorAccount] = useState([]);
  const [loading ,setLoading] = useState(false)
 const {id} = useParams()
  async function GetDoctor(id) {
    setLoading(true)
    const data = await api.get(`/admin/doctor/${id}`).catch((e)=>{
      console.log(e.response.data.message); 
  });
  if(data) {
    setDoctorAccount(data?.data.data)
  
  }
    setLoading(false)
  }
  
  useEffect(()=>{
    GetDoctor(id)
  },[])
  console.log(doctorAccount);
  return (
    <div>
      hi
    </div>
  )
}
