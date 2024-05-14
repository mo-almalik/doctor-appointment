import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from "formik";
import * as Yup from "yup";
import api from '../../services/api.js';
import Loading from '../../utils/Loading.jsx';
export default function UpdateProfile() {
  const [error, setError] = useState(null);
  const [loading ,setLoading] = useState(false)  
  const [info ,setInfo] = useState([])
  let user = {
    gender:info.gender ,
    username :info.username ,
    email :info.email ,
    phone :info.phone ,
  };
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("بريد إلكتروني خاطئ"),
      username:Yup.string(),
      gender:Yup.string(),
      phone:Yup.number(),

  });
  let formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: update,
  });
  async function update(user){

    try{
      
      const data = await api.patch('/user/update',{...user})
      console.log(data);
    }catch(e){
      return setError(e.response.data.message);
    }
  }


  const getUserProfile = async()=>{
 try{
  setLoading(true)
  const data = await api.get('/user/account').catch((err)=>  err);
  setInfo(data.data?.data);
 
  setLoading(false)
 }catch(e){
  setLoading(false)
  return  setError('هنالك خطأ')
 }
  }

useEffect(()=>{
  getUserProfile()
},[])

  return <>
      <Helmet>
          <title> تحدبث البيانات</title>
      </Helmet>


    <div className='container mx-auto w-full'>
    <div>
    <form className="my-5 flex flex-col" onSubmit={formik.handleSubmit}>
    <span className="text-sm text-red-400"> {error}</span>
            <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border  rounded-md px-2 my-0.5 focus:outline-mainlight"
                type="text"
                name="username"
                placeholder={info.username}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="text-red-400  py-1 rounded-md my-0.5 px-2 text-[12px]">
                  {formik.errors.username}
                </div>
              ) : (
                ""
              )}
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border  rounded-md px-2 my-0.5 focus:outline-mainlight"
                type="email"
                name="email"
                placeholder={info.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-400 text-[12px]  py-1 rounded-md my-0.5 px-2">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
             
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border  rounded-md px-2 my-0.5 focus:outline-mainlight"
                type="tel"
                name="phone"
                placeholder={info.phone}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="text-red-400 text-[12px]  py-1 rounded-md my-0.5 px-2">
                  {formik.errors.phone}
                </div>
              ) : (
                ""
              )}

              <select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="gender"
            className="py-3 border  rounded-md px-2 my-0.5 focus:outline-mainlight"
          >
            <option value="mail" defaultValue={'mail'}>
              ذكر 
            </option>
            <option value="female">انثي</option>
          </select>
              {formik.errors.gender && formik.touched.gender ? (
                <div className="text-red-400 text-[12px]  py-1 rounded-md my-0.5 px-2">
                  {formik.errors.gender}
                </div>
              ) : (
                ""
              )}

              {loading ? <>
              <button
                className="bg-main  px-5 text-white w-1/2 mx-auto my-2 py-2 rounded-md cursor-pointer"
                disabled={true}

              >
                <Loading />
              </button>
             </> : <>
             <button
              
                className="bg-main  px-5 text-white w-1/2 mx-auto my-2 py-2 rounded-md cursor-pointer"
             type='submit'
              >
                
              تحديث
              </button>
             </>}
            </form>
    </div>
      
    </div>
  
  </>
    
}
