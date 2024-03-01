
import React from 'react'

import {TbArrowNarrowLeft, TbLoader } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useDoctor } from '../../Context/doctor.js'
export default function DoctorWelcome() {
    const {doctorInfo ,doctorMessage ,loading}= useDoctor()



  return <>
  {doctorMessage ? <>
    {loading ?<>
      <button className='bg-main  w-full px-5 h-10 text-white rounded-md flex items-center justify-between gap-3 text-sm hover:shadow-sm hover:bg-white hover:text-main'>
      <TbLoader className='animate-spin text-md ' />
      </button>
    </> :<>
    <Link to={'setting'}>
<button className='bg-main  w-full px-5 h-10 text-white rounded-md flex items-center justify-between gap-3 text-sm hover:shadow-sm hover:bg-white hover:text-main'>{doctorMessage}   <TbArrowNarrowLeft  /></button>
</Link>
    </>}
    

  </> : <>
    <div>
    {loading ?<>
 <TbLoader className='animate-spin text-md ' />
</> :<>
<div className='my-2 text-gray-700 py-5'>
<h3 className='text-md'>مرحبا د/ {doctorInfo?.username}</h3>
<p className='mt-1 text-sm'>
    نتمني لك قضاء يوم ممتع
</p>
</div>

</>}
    </div>
  </> }


</>
}
