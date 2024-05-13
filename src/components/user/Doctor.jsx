import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/doctor.js';
import { Link } from 'react-router-dom';

export default function Doctor() {
  const { doctors, GetDoctors } = useContext(DoctorContext);

  useEffect(() => {
    GetDoctors()
  }, [])


  return (
    <div>
      {doctors && doctors.length > 0 ? <>
        <div className='container mx-auto mt-10'>
          <div className='flex justify-between items-center'>
            <h4 className='mb-7 text-md font-semibold text-main-400'>الاطباء </h4>
            <Link to={'/doctorList'}>
              <h4 className='mb-7 text-sm font-semibold text-gray-600'>عرض الكل </h4>
            </Link>
          </div>


          <div className='grid grid-cols-4 em:grid-cols-1 em:gap-2 gap-5 '>
            {doctors.slice(0, 4).map((item) => (

              <div className='sm:w-full em:flex' key={item._id}>
                <Link to={`/doctor/${item._id}`} >
                  <div className='h-fit bg-white  rounded-lg text-center p-5 mx-5'>
                    <img src={item.profilePhoto.path ? item.profilePhoto.path : ''} alt={item.username} className='w-full rounded-lg' />
                    <h4 className='py-3 text-gray-700'> {item.username}</h4>
                  </div>
                </Link>
              </div>

            ))}
          </div>

        </div>
      </> : <h6 className='text-gray-500  mx-10 py-5'>لايوجد اطباء </h6>}
    </div>
  )
}
