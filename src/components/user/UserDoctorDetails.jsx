import React, { useEffect, useState } from 'react'
import UserAddAppointment from './UserAddAppointment.jsx'
import { useParams } from 'react-router-dom';
import api from '../../services/api.js';
import { Helmet } from 'react-helmet';
import { TbLoader } from 'react-icons/tb';

export default function UserDoctorDetails() {
  const [doctor ,setDoctor] = useState([])
const [loading ,setLoading] = useState(false)
  const { id } = useParams();
  const getData = async(id) =>{
    setLoading(true)
  const {data} = await api.get(`/doctor/info/${id}`).catch((error)=>console.log(error))
  setDoctor(data.data)

  }
  useEffect(()=>{
    
    getData(id)
  },[])
  return <>
  <Helmet>
    <title> د/ {doctor.name ? doctor.name : ''}</title>
  </Helmet>
   
      <div className='container mx-auto w-full mt-6'>
      <div className='grid grid-cols-2 gap-10 em:grid-cols-1 sm:grid-cols-1'>
      { loading ? <>
        <div className='w-full'>
          <div className='bg-white my-5 p-5 rounded-md '> 
            <div className='flex justify-between items-center'>
              <h3>د/ {doctor.name}</h3>
            {doctor.status === 'online' ?  <span className='text-sm bg-green-200 bg-opacity-55 p-3 rounded-md text-green-700'>متصل الان</span> : ''}
            </div>
          </div>
          <div className='bg-white my-5 p-5 rounded-md '>
            <h3>معلومات عن الدكتور</h3>
            {doctor.bio}
          </div>
          <div className='bg-white my-5 p-5 rounded-md '> شركات التأمين</div>
          <div className='bg-white my-5 p-5 rounded-md '> تقييم المرضي </div>
        </div>
      </> : <>
      <div className='flex justify-center items-center'>
     <TbLoader className='animate-spin' />
     </div>
      </>}
        

        <div className='w-[80%] em:w-full sm:w-full  py-5 bg-white p-6 rounded-md mt-5 h-fit'>
          <UserAddAppointment />
        </div>

      </div>
    </div>
    
  </>
}
 