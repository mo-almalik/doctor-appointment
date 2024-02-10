import React from 'react'

export default function UserDoctorDetails() {
  return <>
    <div className='container mx-auto w-full mt-6'>
      <div className='grid grid-cols-2 gap-10'>

        <div className='w-full'>
          <div className='bg-white my-5 p-5 rounded-md '>دكتور  </div>
          <div className='bg-white my-5 p-5 rounded-md '>معلومات عن الدكتور</div>
          <div className='bg-white my-5 p-5 rounded-md '> شركات التأمين</div>
          <div className='bg-white my-5 p-5 rounded-md '> تقييم المرضي </div>
        </div>

        <div className='w-[80%]  py-5 bg-white p-6 rounded-md mt-5 h-fit'>
         <h5 className='bg-main text-white p-5 text-center rounded-md shadow-md shadow-main-50 mb-5'>تفاصيل الحجز</h5>
          <form className="my-5">
         <div className='my-2'>
         <label htmlFor="name" className='text-gray-700 ' >اسم المريض</label>
            <input placeholder='اسم المريض' name='name' id='name' className='w-full bg-gray-200 h-2 p-6 rounded-md my-2 focus:outline-none'/>
         </div>
         <div className='my-2'>
         <label htmlFor="phone" className='text-gray-700 ' > رقم الهاتف</label>
            <input placeholder='اسم المريض' name='phone' id='phone' className='w-full bg-gray-200 h-2 p-6 rounded-md my-2 focus:outline-none'/>
         </div>
         <div className='my-2'>
         <label htmlFor="name" className='text-gray-700 ' >شركة التأمين </label>
            <input placeholder='اسم المريض' name='name' id='name' className='w-full bg-gray-200 h-2 p-6 rounded-md my-2 focus:outline-none'/>
         </div>
         
          </form>
        </div>

      </div>
    </div>
  </>
}
 