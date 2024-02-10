import React, { useEffect, useState } from 'react'
import { TbArrowNarrowLeft } from "react-icons/tb";
import api from '../../services/api.js';
import { Link } from 'react-router-dom';
import doct1 from '../../Assets/image/doc2.jpg'
export default function UserHome() {
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
    <div className='container mx-auto bg-white bg-opacity-50 h-[500px] rounded-md mt-8 em:text-center'>
        <div className='flex justify-center items-center w-full h-full em:flex-col sm:flex-col'>
          <div className=' w-1/2 em:w-full sm:w-full'>
            <div className='flex  flex-col items-start justify-center px-10 em:px-5 my-3 em:items-center sm:items-center'>
              <h1 className='font-bold text-2xl text-main em:font-normal em:text-md '>  <strong className='text-gray-700  py-3 rounded-md'>عافـــية ,</strong> كل الأطباء في مكان واحد</h1>
              <p className='mt-7 text-gray-500 w-[60%] leading-8 em:w-full sm:full'>
          
             نحن نسعى دائمًا لتسهيل تجربتكم في الوصول إلى خدمات الرعاية الصحية بطريقة مريحة وميسرة.
          </p>
         
            </div>
          </div>
          <div className='w-1/2 em:w-full sm:w-full'>
          <div className='flex  flex-col items-start justify-center px-10'>
          <form className='w-full'>
            <input placeholder=' اكتب اسم الدكتور/المركز/ المستشفى هنا...' name='' className='w-full p-3 rounded-md focus:outline-none' />
            <div className='grid grid-cols-2 my-3 gap-2 em:grid-cols-1'>
              <select className='w-full p-3 rounded-md focus:outline-none text-gray-400'>
                <option selected>المدينة</option>
                <option>12</option>
                <option>12</option>
              </select>
              <select className='w-full p-3 rounded-md focus:outline-none text-gray-400'>
                <option selected>التخصص</option>
                <option>12</option>
                <option>12</option>
              </select>
            </div>
            <button className='bg-main w-full  px-3 py-3 text-white rounded-md flex items-center gap-x-2 justify-center '> <span>تصفح</span> <TbArrowNarrowLeft className=' items-center' /></button>
          </form>
          </div>
          </div>
        </div>
    </div>

    <div className='container mx-auto mt-10'>
      <h4 className='mb-7 text-md font-semibold text-main-400'>الاطباء المميزين</h4>

      <div className='grid grid-cols-4 gap-5 '>
      {doctor.slice(0,4).map((item ,index)=><>
     
      <Link to={`/doctor/${item._id}`} key={index} >
      <div className='h-fit bg-white  rounded-lg text-center p-5'>
       <img src={doct1} alt={item.name}  className='w-full rounded-lg'/>
       <h4 className='py-3 text-gray-700'> {item.name}</h4>
        </div>
      </Link>
      </>)}
    </div>
    </div>
  
  </>
    
}
