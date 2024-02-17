import React, { useState } from 'react'
import { TbLoader } from 'react-icons/tb'

export default function Loading(prop) {
  const [loading ,setLoading] = useState(false)
  return <>
    <div className='flex justify-center items-center'>
     <TbLoader className='animate-spin text-md ' />
     </div>
  </>
}
