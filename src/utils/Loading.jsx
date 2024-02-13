import React from 'react'
import { TbLoader } from 'react-icons/tb'

export default function Loading() {
  return <>
    <div className='flex justify-center items-center'>
     <TbLoader className='animate-spin text-md ' />
     </div>
  </>
}
