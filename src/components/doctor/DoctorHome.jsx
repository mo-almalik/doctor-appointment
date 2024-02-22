import React, { useState } from 'react'

import {TbArrowNarrowLeft, TbLoader } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import DoctorAnalytics from './DoctorAnalytics.jsx'
import { useDoctor } from '../../Context/doctor.js'

export default function DoctorHome() {
  const {doctorInfo ,doctorMessage ,loading}= useDoctor()



  return <>
 <div className='bg-gradient-to-r  from-cyan-500 text-white to-main-500  h-24  w-full em:w-full sm:w-full rounded-md flex justify-between px-10 items-center relative'>

<div className=''> 
{loading ?<>
 <TbLoader className='animate-spin text-md ' />
</> :<>
<h3 className='text-xl font-bold'>مرحبا د/ {doctorInfo?.username}</h3>

</>}
</div>
<div className=''>
{doctorMessage ? <>
  
<Link to={'setting'}>
<button className='bg-main  w-full px-5 h-10 rounded-md flex items-center justify-between gap-3 text-sm hover:shadow-sm hover:bg-white hover:text-main'>{doctorMessage}   <TbArrowNarrowLeft  /></button>
 
</Link>

</> : <>
    
<Link to={'setting'}>
<button className='bg-main  w-full px-5 h-10 rounded-md flex items-center justify-between gap-3 text-sm hover:shadow-sm hover:bg-white hover:text-main'>عرض الحجوزات  <TbArrowNarrowLeft  /></button>
 
</Link>
</>}
</div>

</div>

<div>
 <DoctorAnalytics />
</div>
  </>
}
