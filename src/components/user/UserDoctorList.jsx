import React, { useContext, useEffect} from 'react'

import doct1 from '../../Assets/image/doc1.jpg'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DoctorContext } from '../../Context/doctor.js'
import Loading from '../../utils/Loading.jsx'

export default function UserDoctorList() {
 const {doctors ,GetDoctors ,loading} = useContext(DoctorContext);
 useEffect(()=>{
  GetDoctors()
 },[])

 const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  return <>
  <Helmet>
    <title>تصفح الدكاترة</title>
  </Helmet>
     <div className='my-10 container m-auto '>
    <div className='grid grid-cols-4 gap-5 '>
      {doctors.slice(0,8).map((item ,index)=><Link to={`/doctor/${item._id}`} key={index} >
      <div className='h-fit bg-gray-300  rounded-lg text-center'>
        {loading ? loading : <>
          <img src={doct1} alt={item.username}  className='w-full rounded-lg' />
        </>}
       <h4 className='py-3 text-gray-700'> {item.username}</h4>
        </div>
      </Link>
      )}
    </div>
   </div>
  </>
}
 