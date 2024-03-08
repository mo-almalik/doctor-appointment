import React, { useContext, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { DoctorContext } from '../../Context/doctor.js';
import { TbLoader } from 'react-icons/tb';
import api from '../../services/api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth.js';
export default function DoctorUpdateAccount() {
  const {UpdateInfo,loading  ,doctorInfo} = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const {logout} = useAuth()

  let initialValues = {
    username: doctorInfo.username || '',
      DOB: doctorInfo.DOB || '',
      gender: doctorInfo.gender || 'mail',
      email: doctorInfo.email || '',
      specialization: doctorInfo.specialization || '',
      bio: doctorInfo.bio || '',
  };
  let validationSchema = Yup.object({
    DOB: Yup.string(), //d
    bio: Yup.string(),
    gender: Yup.string(),//
    username: Yup.string(),//d
    email: Yup.string().email(), //
    specialization: Yup.string(), //
  });
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: UpdateInfo
  });

const handeleDeleteAccount = async()=>{
  
  const {data} = await api.delete('doctor/delete').catch((e)=>console.log(e.response.data.message));
  if(data.success === true){
    toast.success(data.message)
    logout()
    navigate('/')

  }
  
}



  return <>
    <div className='flex justify-between items-center em:flex-col'>
    <h4 className='my-5 text-white p-3 rounded-md bg-main w-fit  '>   بيانات الحساب</h4>
    <div className='my-5 text-white p-2 rounded-md bg-red-400 w-fit text-sm cursor-pointer' onClick={()=>setIsOpen(!isOpen)} > 
      حذف الحساب
       <div className={`${isOpen ? 'bg-white shadow-md model z-50 text-gray-500 duration-500 ' : 'hidden'}`}>
          
           <div className='p-5'>
 <button onClick={()=>setIsOpen(!isOpen)} className='bg-red-500'>اغلاق</button>
 <button className='bg-red-500' onClick={()=>handeleDeleteAccount()}>حذف الحساب</button>
           </div>
       </div>
      </div>
    </div>
    {loading ? <>
      <button className='bg-secondary p-3 text-white rounded-md w-full flex justify-center items-center' >  <TbLoader className='animate-spin text-md ' /></button>

    </> : <>
    <form onSubmit={formik.handleSubmit} className='text-sm text-gray-400' >
      <div className="my-4">
        <label htmlFor="username" className="text-gray-700 ">
          الاسم
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={`${doctorInfo.username ? doctorInfo.username : "الاسم " }`}
          name="username"
          id="username"
          type="text"
          
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.username && formik.touched.username ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.username}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-4">
        <label htmlFor="DOB" className="text-gray-700 ">
          تاريخ الملاد
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
       
          name="DOB"
          id="DOB"
          type="text"
          placeholder={`${doctorInfo.DOB ? doctorInfo.DOB : " YYYY-MM-DD - 01-12-1980" }`}
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.DOB && formik.touched.DOB ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.DOB}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-4">
          <label htmlFor="gender" className="text-gray-700 ">
            اختار النوع 
          </label>
          <select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="gender"
            placeholder={`${doctorInfo.gender ? doctorInfo.gender:"" }`}
            className="w-full bg-gray-200  p-2 h-12 rounded-md my-2 focus:outline-none"
          >
            <option value="mail" defaultValue>
              ذكر 
            </option>
            <option value="female">انثي</option>
          </select>
          {formik.errors.gender && formik.touched.gender ? (
                <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
                  {formik.errors.gender}
                </div>
              ) : (
                ""
              )}
        </div>
      <div className="my-4">
        <label htmlFor="email" className="text-gray-700 ">
          البريد الالكتروني
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
       
          placeholder={`${doctorInfo.email ? doctorInfo.email:"البريد الالكتروني " }`}

          name="email"
          id="email"
          type="email"
          
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}
      </div>
     
      
      <div className="my-4">
        <label htmlFor="specialization" className="text-gray-700 ">
         التخصص
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={`${doctorInfo.specialization ? doctorInfo.specialization: "التصخصص " }`}
          name="specialization"
          id="specialization"
          type="text"
         
          className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.specialization && formik.touched.specialization ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.specialization}
          </div>
        ) : (
          ""
        )}
      </div>
      
      <div className="my-4">
        <label htmlFor="bio" className="text-gray-700 ">
         معلومات عنك
        </label>
        <textarea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={`${doctorInfo.bio ? doctorInfo.bio: "معلومات عنك" }`}
          name="bio"
          id="bio"
          type="text"
           
          className="w-full bg-gray-200 p-2 min-h-24 rounded-md my-2 focus:outline-none"
        />
        {formik.errors.bio && formik.touched.bio ? (
          <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
            {formik.errors.bio}
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
    </>}

  </>
}
