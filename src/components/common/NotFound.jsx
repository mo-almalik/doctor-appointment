import React from 'react'
import error from '../../Assets/image/404.svg'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return ( <>
  <div className='h-screen w-full bg-white flex justify-center items-center '>  
    
      <div className='text-main container mx-auto text-center'>
     <img src={error} alt='error' className='w-[40%] mx-auto' />
       <h3 className='text-bold text-md my-5'>لم يتم العثور علي الصفحة</h3>
       <Link to={'/'} className='bg-gray-600 px-10 py-2 rounded-md text-white'>
         الرئيسية
       </Link>

      </div>
    </div>
  </>
  )
}
