import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
export default function DoctorPasswordChenge() {
  let doctorData = {
    oldPassword: "",
    newPassword: "",


  };

  let validationSchema = Yup.object({
   
    oldPassword: Yup.string().required(" مطلوب"),//
    newPassword: Yup.string().required(" مطلوب"),//
   

  });
  let formik = useFormik({
    initialValues: doctorData,
    validationSchema,
    onSubmit: () => {

    },
  });
  return <>
    <h4 className='my-5 text-white p-3 rounded-md bg-main w-fit  '>تغير كلمة المرور  </h4>
    <form className='text-sm text-gray-400'>
      
      
    
      
      <div className="my-4">
        <label htmlFor="oldPassword" className="text-gray-700 ">
          كلمة المرور الحالية
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="كلمة المرور الحالية "
          name="oldPassword"
          id="oldPassword"
          type="password"
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.oldPassword && formik.touched.oldPassword ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.oldPassword}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-4">
        <label htmlFor="newPassword" className="text-gray-700 ">
         كلمة المرور الجديدة
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="كلمة المرور الجديدة"
          name="newPassword"
          id="newPassword"
          type="password"
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.newPassword}
          </div>
        ) : (
          ""
        )}
      </div>
     

    
      <button className='bg-secondary p-3 text-white rounded-md w-full'>تعديل</button>
    </form>
  </>
}
