import React, { useContext, useEffect } from "react";
import {
  TbArrowNarrowLeft,
  TbBriefcaseFilled,
  TbCoin,
  TbLoader,
  TbUsersGroup,
} from "react-icons/tb";
import { DoctorContext} from "../../Context/doctor.js";
import { Link } from "react-router-dom";
import { user } from "../../utils/auth.js";


export default function DoctorAnalytics() {

  const {doctorInfo ,doctorMessage ,loading ,GetDoctorData ,doctorcount}= useContext(DoctorContext);
console.log(doctorMessage);
  useEffect(()=>{
    GetDoctorData()
  },[])
 const {appointmentCount ,patientCount ,totalAmount} = doctorcount
  return (
    <>
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
<h3 className='text-md'>مرحبا د/ {user().username}</h3>
<p className='mt-1 text-sm'>
    نتمني لك قضاء يوم ممتع
</p>
</div>

</>}
    </div>
  </> }


      <div className="w-full flex justify-between items-start my-5 gap-5 em:flex-col sm:flex-col md:flex-col">
        <div className="bg-white  w-full em:w-full sm:w-full md:w-full rounded-md  p-5 ">
          <div className="flex  justify-between items-center">
            <div className="flex items-center">
              <div className="bg-[#EEF3FF] w-12 h-12 flex justify-center items-center rounded-md text-main">
                <TbBriefcaseFilled className="w-6 h-6" />
              </div>
              <h6 className="text-gray-500  mx-3">الحجوزات </h6>
            </div>
           {loading ?  <TbLoader className='animate-spin text-md ' /> : <span className="text-gray-900 font-bold">{appointmentCount }</span> }  
            {/* <span className='text-green-500 flex items-center'>20 +<TbSquareRoundedArrowUpFilled className='w-5 h-5 ms-1' /></span> */}
          </div>
        </div>
        <div className="bg-white  w-full em:w-full sm:w-full md:w-full rounded-md  p-5">
          <div className="flex  justify-between items-center">
            <div className="flex items-center">
              <div className="bg-[#FFF4F2] w-12 h-12 flex justify-center items-center rounded-md text-[#FF8E26]">
                <TbUsersGroup className="w-6 h-6" />
              </div>
              <h6 className="text-gray-500 mx-3">المرضي</h6>
            </div>

            {loading ?  <TbLoader className='animate-spin text-md ' /> : <span className="text-gray-900 font-bold">{patientCount}</span> }  

            {/* <span className='text-green-500 flex items-center'>20 +<TbSquareRoundedArrowUpFilled className='w-5 h-5 ms-1' /></span> */}
          </div>
        </div>
        <div className="bg-white  w-full em:w-full sm:w-full md:w-full rounded-md  p-5">
          <div className="flex  justify-between items-center">
            <div className="flex items-center">
              <div className="bg-[#EBFFE8] w-12 h-12 flex justify-center items-center rounded-md text-[#14CC26]">
                <TbCoin className="w-6 h-6" />
              </div>
              <h6 className="text-gray-500 mx-3">الايرادات</h6>
            </div>
            
            {loading ?  <TbLoader className='animate-spin text-md ' /> : <span className="text-gray-900 font-bold">{totalAmount} $</span> }  

            {/* <span className='text-red-500 flex items-center'>20 -<TbSquareRoundedArrowUpFilled className='w-5 h-5 ms-1 rotate-180' /></span> */}
          </div>
        </div>
        
        {/* <div className="bg-white  w-full em:w-full sm:w-full md:w-full rounded-md  p-5">
          <div className="flex  justify-between items-center">
            <div className="flex items-center">
              <div className="bg-[#EBFFE8] w-12 h-12 flex justify-center items-center rounded-md text-[#14CC26]">
                <TbCoin className="w-6 h-6" />
              </div>
              <h6 className="text-gray-500 mx-3">الايرادات</h6>
            </div>
            <h6 className="text-gray-900 font-bold">50002 $</h6>
            
          </div>
        </div> */}

      </div>



      <div className="w-full h-80 bg-white rounded-md">
        
      </div>
    </>
  );
}
