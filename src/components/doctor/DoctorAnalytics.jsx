import React from "react";
import {
  TbBriefcaseFilled,
  TbCoin,
  TbUsersGroup,
} from "react-icons/tb";


export default function DoctorAnalytics() {
  return (
    <>
      <div className="w-full flex justify-between items-start my-5 gap-5 em:flex-col sm:flex-col md:flex-col">
        <div className="bg-white  w-full em:w-full sm:w-full md:w-full rounded-md  p-5 ">
          <div className="flex  justify-between items-center">
            <div className="flex items-center">
              <div className="bg-[#EEF3FF] w-12 h-12 flex justify-center items-center rounded-md text-main">
                <TbBriefcaseFilled className="w-6 h-6" />
              </div>
              <h6 className="text-gray-500  mx-3">الحجوزات </h6>
            </div>
            <span className="text-gray-900 font-bold">500</span>
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

            <span className="text-gray-900 font-bold">500</span>
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
            <h6 className="text-gray-900 font-bold">50002 $</h6>
            {/* <span className='text-red-500 flex items-center'>20 -<TbSquareRoundedArrowUpFilled className='w-5 h-5 ms-1 rotate-180' /></span> */}
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
            <h6 className="text-gray-900 font-bold">50002 $</h6>
            {/* <span className='text-red-500 flex items-center'>20 -<TbSquareRoundedArrowUpFilled className='w-5 h-5 ms-1 rotate-180' /></span> */}
          </div>
        </div>
      </div>



      <div className="w-full h-80 bg-white rounded-md">
        
      </div>
    </>
  );
}
