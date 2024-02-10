import React, { useEffect, useState } from 'react'
import api from '../../services/api.js'
import doct1 from '../../Assets/image/doc1.jpg'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function UserDoctorList() {
  const [doctor , setDoctors]= useState([])
  
  const getDoctors= async()=>{
   const {data}= await api.get('/doctor/').catch((err)=>console.log(err))
   setDoctors(data?.data)
   console.log(doctor);
  }
  useEffect(()=>{
  getDoctors()
  },[])
  return <>
  <Helmet>
    <title>تصفح الدكاترة</title>
  </Helmet>
     <div className='my-10 container m-auto '>
    <div className='grid grid-cols-4 gap-5 '>
      {doctor.slice(0,4).map((item ,index)=><>
     
      <Link to={`/doctor/${item._id}`} key={index} >
      <div className='h-fit bg-gray-300  rounded-lg text-center'>
       <img src={doct1} alt={item.name}  className='w-full rounded-lg'/>
       <h4 className='py-3 text-gray-700'> {item.name}</h4>
        </div>
      </Link>
      </>)}
    </div>
   </div>
  </>
}
 