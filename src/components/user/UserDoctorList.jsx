import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DoctorContext } from '../../Context/doctor.js'
import Loading from '../../utils/Loading.jsx'

export default function UserDoctorList() {
 const {doctors ,GetDoctors ,loading} = useContext(DoctorContext);
 useEffect(()=>{
  GetDoctors()
 },[])


  return <>
  <Helmet>
    <title>تصفح الدكاترة</title>
  </Helmet>
     <div className='my-10 container m-auto '>
    <div className='grid grid-cols-4 gap-5 '>
      {doctors.slice(0,8).map((item ,index)=><Link to={`/doctor/${item._id}`} key={index} >
      <div className='h-fit bg-gray-300  rounded-lg text-center p-3'>
        {loading ? loading : <>
          <img src={item.profilePhoto.path ? item.profilePhoto.path : '' } alt={item.username}  className='w-full rounded-lg ' />
        </>}
       <h4 className='py-3 text-gray-700'> {item.username}</h4>
        </div>
      </Link>
      )}
    </div>
   </div>
  </>
}
 