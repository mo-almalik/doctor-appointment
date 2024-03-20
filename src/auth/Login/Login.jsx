import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { saveAuthData, isAuthenticated, userRole } from "../../utils/auth.js";
import api from "../../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
export default function Login() {
  const [error, setError] = useState(null);
  let navigate =  useNavigate();
  let user = {
    email: "",
    password: "",
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
  });

  async function Login(userData) {
    let { data } = await api.post("/auth/login", userData).catch((error) => {
      setError(error.response.data.message);
    });
    // Log the data from the response

    if (data.success === true) {
      const token = 'Bearer ' +  data.token;

      saveAuthData(token);
   
      if (isAuthenticated()) {
      
        switch (userRole) {
          case 'admin':
            navigate('/admin');
            break;
          case 'user':
            navigate('/');
            break;
         
          default:
            // يمكنك إضافة سلوك إضافي هنا إذا لزم الأمر
        }
      }
    }
  }

  let formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: Login,
  });

  
  return <>
    {/* <Navbar /> */}
    <div className="flex justify-center items-center container w-full mx-auto bg-gray-100 shadow-sm rounded-lg py-5 my-5 gap-4">
      {isAuthenticated() ? (
        <>
          <h6>انت بالفعل قم بتسجيل الدخول</h6>
          <Link to="/">الرئيسية</Link>
        </>
      ) : (
        <>
          <div className=" w-[40%] sm:mx-4 em:mx-5 sm:w-full em:w-full text-center ">
            <h3 className="text-main font-bold "> تسجيل دخول</h3>
            <p className="text-gray-400 mt-2">اهلا بك </p>
            {error !== null ? (
              <div className="bg-red-400 text-white my-2 rounded-md  px-2">
                
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
                type="email"
                name="email"
                placeholder="البريد الالكتروني"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="bg-red-400 text-white py-1 rounded-md my-2 px-2">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="py-3 border rounded-md px-2 my-2 focus:outline-mainlight"
                type="password"
                name="password"
                placeholder="كلمة المرور"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="bg-red-400 text-white py-1 rounded-md my-2 px-2">
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
            <Link to="/register" className="text-gray-500 mt-2">
              
              انشي حساب ؟
            </Link>
          </div>
        </>
      )}
    </div>
    </>;
}
