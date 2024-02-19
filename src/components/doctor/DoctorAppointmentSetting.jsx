import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDoctor } from '../../Context/doctor.js';
import { TbLoader } from 'react-icons/tb';
import api from '../../services/api.js';
export default function DoctorAppointmentSetting() {
  const {UpdateInfo ,loading} = useDoctor()
 

  let initialValues = {
    phone: "",
    price: "",
    location: "",
   

  };

  let validationSchema = Yup.object({
   
    phone: Yup.number(),//
    price: Yup.number(),//
    location: Yup.string(),//

  });
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:UpdateInfo
  });
  return <>
    <h4 className='my-5 text-white p-3 rounded-md bg-main w-fit  '>معلومات الحجز </h4>
    <form className='text-sm text-gray-400' onSubmit={formik.handleSubmit}>
      
      
    
      
      <div className="my-4">
        <label htmlFor="phone" className="text-gray-700 ">
          رقم الهاتف
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="رقم الهاتف "
          name="phone"
          id="phone"
          type="number"
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.phone}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-4">
        <label htmlFor="price" className="text-gray-700 ">
         سعر المقابلة
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="سعر المقابلة"
          name="price"
          id="price"
          type="number"
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.price && formik.touched.price ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.price}
          </div>
        ) : (
          ""
        )}
      </div>
     
      <div className="my-4">
        <label htmlFor="location" className="text-gray-700 ">
         وصف الموقع
        </label>
        <textarea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="وصف الموقع"
          name="location"
          id="location"
          type="text"
          className="w-full bg-gray-200 p-2 min-h-24 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.location && formik.touched.location ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.location}
          </div>
        ) : (
          ""
        )}
      </div>
    
      {loading ?<>
      <button className='bg-secondary p-3 text-white rounded-md w-full flex justify-center items-center' >  <TbLoader className='animate-spin text-md ' /></button>

     </> :<>
     <button className='bg-secondary p-3 text-white rounded-md w-full' type='submit'>حفظ</button>
     </>}
    </form>
  </>
}
