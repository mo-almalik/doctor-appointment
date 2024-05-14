import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import api from '../../services/api.js'
import userProfile  from '../../Assets/image/user.jpg'
import UserAppointment from './UserAppointment.jsx'
import Loading from '../../utils/Loading.jsx'
import { TbEdit } from "react-icons/tb";
import { Link } from 'react-router-dom'
export default function UserProfile() {
  const [info ,setInfo] = useState([])
  const [loading ,setLoading] = useState(false)
  const [error ,setError] = useState()


  const getUserProfile = async()=>{
 try{
  setLoading(true)
  const data = await api.get('/user/account').catch((err)=>  err);
  setInfo(data.data?.data);
 
  setLoading(false)
 }catch(e){
  setLoading(false)
  return  setError('هنالك خطأ')
 }
  }

useEffect(()=>{
  getUserProfile()
},[])


  return <>
    <Helmet>
      <title>الحساب الشخصي</title>
    </Helmet>

  <div className='w-full  container mx-auto '>
    <div className='flex gap-4'>
      <div className='w-full bg-white  rounded-md p-2 h-fit relative'>
        <div className='flex flex-col justify-center items-center text-center'>
        {loading ? <>
    <div className='w-full flex justify-center items-center text-3xl  '>
  <Loading  />
  </div> </> : <>
    <div >
         
         <img src={userProfile} alt={info.username} className='w-[15%] mx-auto' />
         <div className='text-gray-600'>
           <h6 className='my-2'>
           <span className='mx-4 text-sm' >الاسم : </span>
           {info.username}</h6>
           <h6 className='my-2'>
           <span className='mx-4  text-sm'>البريد :</span>
           {info.email}</h6>
           <h6 className='my-2'>
           <span className='mx-4  text-sm'>الجوال :</span>
           {info.phone}</h6>
         </div>
         </div>
         
         <Link to='/profile/update' className='w-10 h-10 flex justify-center items-center bg-gray-500 text-white py-2 rounded-full m-5 absolute top-0 right-0'><TbEdit /></Link>
  </> }
         
        </div>
      </div>

    </div>
    <div className='w-full my-5 h-auto'>
        <UserAppointment />
      </div>
  </div>
  </>
}
 