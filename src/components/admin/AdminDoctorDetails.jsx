import React, { useEffect, useState } from 'react'
import api from '../../services/api.js';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../../utils/Loading.jsx';
import doct1 from '../../Assets/image/doc1.jpg'
export default function AdminDoctorDetails() {
  const [doctorAccount ,setDoctorAccount] = useState([]);
  const [appointment ,setAppointment]= useState([]);
  const [loading ,setLoading] = useState(false)
 const {id} = useParams()
  async function GetDoctor(id) {
    setLoading(true)
    const data = await api.get(`/admin/doctor/${id}`).catch((e)=>{
      console.log(e.response.data.message); 
  });
  if(data) {
    setTimeout(()=>{
      setDoctorAccount(data?.data.data.info)
      setAppointment(data?.data.data.appointment)
    },1000)
  
  }
    setLoading(false)
  }
  
  useEffect(()=>{
    GetDoctor(id)
  },[])

  console.log(doctorAccount);
  const {username ,email ,status,location,price ,isBlock ,createdAt ,ads} = doctorAccount
  return (<>
<Helmet>
 {loading ? '' : <title> د /{ username ? username : 'تفاصيل الدكتور'}</title>
}
</Helmet>

<div className='bg-white rounded-md w-full py-9'>
  <div className='flex justify-center items-center flex-col '>
    {loading ? <><Loading /></> : <>
      <img src={doct1} alt={username} className='w-40 rounded-full object-cover h-40' />
     <h3 className='my-5'> د / {username}</h3>
    </>}
  </div>
</div>
  </>)
}
