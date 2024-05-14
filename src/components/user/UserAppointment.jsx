import React, { useEffect, useState } from 'react'
import api from '../../services/api.js'

import Loading from '../../utils/Loading.jsx';

export default function UserAppointment() {
  const [appointment ,setAppointment] = useState([])
  const [loading ,setLoading] = useState(false)
  const [error ,setError] = useState()


  const getMyAppointment = async()=>{
 try{
  setLoading(true)
  const {data} = await api.get('/user/appointments').catch((err)=>  err);
  setAppointment(data.data.docs)
  
  setLoading(false)
 }catch(e){
  setLoading(false)
  return  e
 }
  }

  const status ={
    'pending' : 'انتظار',
     'confirmed' : 'ماكد',
     'canceled' : 'ملغي'
  }
  const statusColors = {
    'pending': 'bg-green-500 ',
    'confirmed': 'bg-main-500',
    'canceled': 'bg-yellow-500',
  };


  async function updateAppointment(id){
    try{
      setLoading(true)
      await api.put(`/user/appointment/${id}`).catch((err)=>  err);
      
      getMyAppointment();

      setLoading(false)
    
     }catch(e){
      setLoading(false)
      return  e
     }
  }
 
  

  useEffect(()=>{
    
    getMyAppointment();
   
    },[])
  console.log(appointment);
  return <>
    
    <div className='container mx-auto text-center w-full h-full'>
   
    {loading ? <>
    <div className='w-full flex justify-center items-center text-3xl  '>
  <Loading  />
  </div>
  </> : <>
 {error ? <><span className='text-red-500'>{error}</span></> : '' }
  <div className='grid grid-cols-5 gap-5 em:grid-cols-1 sm:grid-cols-1   h-full'>

    {appointment && <> 
      {appointment.map((item,index)=> <div key={index} className=' w-full h-full py-5 justify-start flex flex-col items-center rounded-md bg-white gap-3 text-sm' >
 
 <div className='my-2  w-full mx-auto '>
 <span className='text-gray-600'>رقم التزكرة : </span>
  <span className='text-gray-500'># {item.visitNo}</span>
 </div>
 <div className='my-2  w-full mx-auto'>
 <span className='text-gray-600'>الاسم   :</span>
 <span className='text-gray-500'> {item.name}</span>
 
 </div>
 <div className='my-2  w-full mx-auto'>
 <span className='text-gray-600'>الجوال :</span>
 <span className='text-gray-500'> {item.phone}</span>
 </div>
 <div className='my-2  w-full mx-auto'>
 <span className='text-gray-600'>اسم الطبيب : </span>

 <span className='text-gray-500'> {item.doctorId.username ? item.doctorId.username : '' }</span>
 </div>

 <div className=' px-5 '>
 <span className={`bg-opacity-50 rounded-md text-[12px] p-2 ${statusColors[item.status]}`}>{status[item.status]}</span>
 </div>

 {item.status === 'canceled' ? null : <>
 <button onClick={()=>updateAppointment(item._id)}>الغاء</button>
 </>}
</div>
 )}
    </>}

  </div>



  </>}

</div>
  </>
}
 