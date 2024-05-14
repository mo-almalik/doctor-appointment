import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { saveAuthData, isAuthenticated, userRole } from "../../utils/auth.js";
import api from "../../services/api.js";
import { Link,  useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import Loading from "../../utils/Loading.jsx";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();
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
    setLoading(true)
    let { data } = await api.post("/auth/login", userData).catch((error) => {
      setError(error.response.data.message);
      setLoading(false)
    });
    // Log the data from the response

    if (data.success === true) {
      setLoading(false)
      const token = 'Bearer ' + data.token;

      saveAuthData(token);

      if (isAuthenticated()) {
        const Role = userRole()

        switch (Role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'user':
            navigate('/');
            break;

          default:


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
    <Navbar />
    <div className="flex justify-center items-center container w-full mx-auto bg-gray-100 shadow-sm rounded-lg py-5 my-5 gap-4">
      {isAuthenticated() ? (
        <>
          <h6>انت بالفعل قم بتسجيل الدخول</h6>

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

              {loading ? <>
                <button
                  className="bg-main  px-5 text-white w-1/2 mx-auto my-2 py-2 rounded-md cursor-pointer"
                  disabled={true}

                >
                  <Loading />
                </button>
              </> : <>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  className="bg-main  px-5 text-white w-1/2 mx-auto py-2 rounded-md cursor-pointer"
                  type="submit"
                >

                  دخول
                </button>
              </>}
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
