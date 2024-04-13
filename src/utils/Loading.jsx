import React from 'react'
import { TbLoader } from 'react-icons/tb'

export default function Loading(prop) {

  return <>
    <div className='flex justify-center items-center'>
     <TbLoader className='animate-spin  ' />
     </div>
  </>
}
