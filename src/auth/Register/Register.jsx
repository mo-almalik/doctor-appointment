import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import { toast } from 'react-toastify';
export default function Register() {
    const [error, setError] = useState(null);
let navigate =  useNavigate();
    let user = {
        password: "",
        username :"",
        email :"",
        phone :"",
      };
      let validationSchema = Yup.object({
        email: Yup.string()
          .email("بريد إلكتروني خاطئ")
          .required("البريد الالكتروني مطلوب"),
        password: Yup.string()
          .required("ادخل كلمة المرور")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "الحرف الأول كبير ثم صغير ثم أرقام"
          ),
          username:Yup.string().required('الاسم مطلوب'),
          phone:Yup.number().required('رقم الهاتف مطلوب'),

      });
      let formik = useFormik({
        initialValues: user,
        validationSchema,
        onSubmit: Registe,
      });


      async function  Registe(userData) {
        let data = await api.post("/auth/register", userData).catch((error) => {
          setError(error.response.data.message);
        });
        // Log the data from the response
     if(data.status === 200) {
        toast.success('تم التسجيل بنجاح')
        navigate('/login')
     }
        
      }
  return (<>
<Helmet>
    <title>انشاء حساب</title>
</Helmet>

<div className="flex justify-center items-center container w-full mx-auto bg-gray-100 shadow-sm rounded-lg py-5 my-5 gap-4">

<div className=" w-[40%] sm:mx-4 em:mx-5 sm:w-full em:w-full text-center ">
            <h3 className="text-main font-bold ">  انشاء  حساب</h3>
            {/* <p className="text-gray-400 mt-2">اهلا بك </p> */}
            {error !== null ? (
              <div className="bg-red-400 text-white my-2 rounded-md  px-2 ">
                
                <i className="fa-solid fa-exclamation mx-2 errorLogin"></i>
                {error}
              </div>
            ) : (
              ""
            )}
            <form className="my-5 flex flex-col" onSubmit={formik.handleSubmit}>
            <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border  rounded-md px-2 my-2 focus:outline-mainlight"
                type="text"
                name="username"
                placeholder="اسم المستخدم "
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="bg-red-400 text-white py-1 rounded-md my-2 px-2 text-[12px]">
                  {formik.errors.username}
                </div>
              ) : (
                ""
              )}
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border  rounded-md px-2 my-2 focus:outline-mainlight"
                type="email"
                name="email"
                placeholder="البريد الالكتروني"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="bg-red-400 text-[12px] text-white py-1 rounded-md my-2 px-2">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
             
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border  rounded-md px-2 my-2 focus:outline-mainlight"
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="bg-red-400 text-[12px] text-white py-1 rounded-md my-2 px-2">
                  {formik.errors.phone}
                </div>
              ) : (
                ""
              )}

              <input
                onBlur={formik.handleBlur}
               onChange={formik.handleChange}
                className="py-3 border rounded-md px-2 my-2 focus:outline-mainlight"
                autoComplete="current-password"
                type="password"
                name="password"
                placeholder="كلمة المرور"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="bg-red-400 text-[12px] text-white py-1 rounded-md my-2 px-2">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}

              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="bg-main  px-5 text-white w-1/2 mx-auto py-2 rounded-md"
                type="submit"
              >
                
                دخول
              </button>
            </form>
            <Link to="register" className="text-gray-500 mt-2">
              
              انشي حساب ؟
            </Link>
          </div>
</div>

</>)
}

function DoctorRegister(){
    return <>
        hi doctor
    </>
}