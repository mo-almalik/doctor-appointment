import React, { useEffect, useState } from 'react'
import UserAddAppointment from './UserAddAppointment.jsx'
import { useParams } from 'react-router-dom';
import api from '../../services/api.js';
import { Helmet } from 'react-helmet';
import { TbLoader } from 'react-icons/tb';
import UserReview from './Userreview.js';
import getStarIcons from './Userreview.js';


export default function UserDoctorDetails() {
  const [doctor ,setDoctor] = useState([])
  const [review ,setReview] = useState([])
const [loading ,setLoading] = useState(false)
  const { id } = useParams();
  const getData = async(id) =>{
    setLoading(true)
  const data = await api.get(`/doctor/info/${id}`).catch((error)=>console.log(error))
   setDoctor(data.data.data?.info)
  setReview(data.data.data?.review)
  setLoading(false)
 

  }
  useEffect(()=>{
   
    getData(id)
    
  },[])
  
  return <>
  <Helmet>
    <title> د/ {doctor.username ? doctor.username : ''}</title>
  </Helmet>
   
      <div className='container mx-auto w-full mt-6'>
      <div className='grid grid-cols-2 gap-10 em:grid-cols-1 sm:grid-cols-1'>
     
        <div className='w-full'>
          

         
          <div className='bg-white my-5 p-5 rounded-md '> 
            <div className='flex justify-between items-center'>
            {loading ? <>
              <TbLoader className='animate-spin' />
            </> :<>
            <h3>د/ {doctor.username}</h3>
            {doctor.status === 'online' ?  <span className='text-sm bg-green-200 bg-opacity-55 p-3 rounded-md text-green-700'>متصل الان</span> : ''}
            </>}
             
            </div>
          </div>
          <div className='bg-white my-5 p-5 rounded-md '>
            <h3 className='mb-3'>معلومات عن الدكتور</h3>
              {loading ? <>
              <TbLoader className='animate-spin' />
            </> :<>
            <p className='text-gray-600'> {doctor.bio}</p>
            </>}
          </div>
          <div className='bg-white my-5 p-5 rounded-md '> شركات التأمين</div>
          
          

          
          <div className='bg-white my-5 p-5 rounded-md '> 
           <h4>تقييم المرضي </h4>
             <div className='flex flex-col gap-4 w-full mt-5'>
             {loading ? <>
            <TbLoader className='animate-spin' />
           </> : <>
           {review.map((item,index)=>  <div key={index} className='bg-gray-200 bg-opacity-60 rounded-md px-5'>
             <div className='my-5 flex justify-between'>
             <div>{item.comment} </div>
             <div className='flex'>
             { item.rating ? getStarIcons(item.rating)   : "" } 
             </div>
             </div>
           </div>
           )}
           </>}
             </div>
          </div>
        </div>
     
        

        <div className='w-[80%] em:w-full sm:w-full  py-5 bg-white p-6 rounded-md mt-5 h-fit'>
          <UserAddAppointment />
        </div>

      </div>
    </div>
    
  </>
}
 