import React, { useEffect, useState } from 'react'
import api from '../../services/api.js'
import {TbArrowNarrowLeft, TbLoader } from 'react-icons/tb'
import { Link } from 'react-router-dom'

export default function DoctorHome() {
  const [doctor,setDoctor] = useState([])
  const [loading ,setLoading] = useState(false)

  async function MyAccount (){
    setLoading(true)
    const {data} = await api.get('/doctor/account').catch((error)=>console.log(error))
    setDoctor(data);
    setLoading(false)
  }
  useEffect(()=>{
    MyAccount()
  },[])
  return (
    <div>
     
     <div className='bg-gradient-to-r  from-cyan-500 text-white to-main-500  h-24  w-full em:w-full sm:w-full rounded-md flex justify-between px-10 items-center relative'>

     <div className=''> 
     {loading ?<>
      <TbLoader className='animate-spin text-md ' />
     </> :<>
     <h3 className='text-xl font-bold'>مرحبا د/ {doctor?.data?.username}</h3>
     <p className='text-gray-300 mt-2'>{doctor?.message ? doctor?.message : ''}</p>
     </>}
     </div>
     <div className=''>
     <Link to={'account/update'}>
     <button className='bg-main  w-full px-5 h-10 rounded-md flex items-center justify-between gap-3 text-sm hover:shadow-sm hover:bg-white hover:text-main'>اكمل الأعدادات الحساب <TbArrowNarrowLeft  /></button>

     </Link>
     </div>
     </div>
     
    </div>
  )
}
