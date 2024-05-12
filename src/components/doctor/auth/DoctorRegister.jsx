import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../services/api.js';
import { toast } from 'react-toastify';

import docForm from '../../../Assets/image/Doctors-bro.svg';
import Loading from '../../../utils/Loading.jsx';

export default function DoctorRegister() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    profilePhoto: null, // Initialize profilePhoto as null
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('بريد إلكتروني خاطئ').required('البريد الالكتروني مطلوب'),
    password: Yup.string()
      .required('ادخل كلمة المرور')
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'الحرف الأول كبير ثم صغير ثم أرقام'),
    username: Yup.string().required('الاسم مطلوب'),
    phone: Yup.string().required('رقم الهاتف مطلوب'),
    profilePhoto: Yup.mixed().required('يرجى تحديد صورة للملف الشخصي'), // Update validation for profilePhoto
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('password', values.password);
      formData.append('profilePhoto', values.profilePhoto); // Append profilePhoto to FormData

      const response = await api.post('/auth/doctor/register', formData);

      if (response.status === 200) {
        toast.success('تم التسجيل بنجاح');
        setTimeout(() => {
          navigate('/doctor/login');
        }, 1000);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (event) => {
    formik.setFieldValue('profilePhoto', event.currentTarget.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>انشاء حساب</title>
      </Helmet>

      <div className="flex my-3 em:flex-col sm:flex-col justify-center items-center container w-full mx-auto h-screen">
        <div className="w-[40%] em:w-full sm:w-full">
          <img src={docForm} alt="Doctor" className="w-full" />
        </div>
        <div className="w-[40%] sm:mx-4 em:mx-5 sm:w-full em:w-full text-center bg-gray-100 p-10 em:p-2 sm:p-2">
          <h3 className="text-main font-bold ">انشاء حساب</h3>
          {error && (
            <div className="bg-red-400 text-white my-0.5 rounded-md px-2 text-sm">
              <i className="fa-solid fa-exclamation mx-2 errorLogin"></i>
              {error}
            </div>
          )}
          <form className="my-5 flex flex-col" onSubmit={formik.handleSubmit}>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              className="py-3 border rounded-md px-2 my-0.5 focus:outline-mainlight"
              type="text"
              name="username"
              placeholder="اسم المستخدم"
            />
            {formik.errors.username && formik.touched.username && (
              <div className="bg-red-400 text-white py-1 rounded-md my-0.5 px-2 text-sm">
                {formik.errors.username}
              </div>
            )}
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className="py-3 border rounded-md px-2 my-0.5 focus:outline-mainlight"
              type="email"
              name="email"
              placeholder="البريد الالكتروني"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="bg-red-400 text-white py-1 rounded-md my-0.5 px-2 text-sm">
                {formik.errors.email}
              </div>
            )}
            <input
              onChange={handleFileChange}
              className="py-3 border rounded-md px-2 my-0.5 focus:outline-mainlight"
              type="file"
              name="profilePhoto"
            />
            {formik.errors.profilePhoto && formik.touched.profilePhoto && (
              <div className="bg-red-400 text-white py-1 rounded-md my-0.5 px-2 text-sm">
                {formik.errors.profilePhoto}
              </div>
            )}
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="py-3 border rounded-md px-2 my-0.5 focus:outline-mainlight"
              type="tel"
              name="phone"
              placeholder="رقم الهاتف"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="bg-red-400 text-white py-1 rounded-md my-0.5 px-2 text-sm">
                {formik.errors.phone}
              </div>
            )}
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="py-3 border rounded-md px-2 my-0.5 focus:outline-mainlight"
              autoComplete="current-password"
              type="password"
              name="password"
              placeholder="كلمة المرور"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="bg-red-400 text-white py-1 rounded-md my-0.5 px-2 text-sm">
                {formik.errors.password}
              </div>
            )}
            {loading ? (
              <button className="bg-main px-5 text-white w-1/2 mx-auto my-2 py-2 rounded-md cursor-pointer" disabled>
                <Loading />
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="bg-main px-5 text-white w-1/2 mx-auto my-2 py-2 rounded-md cursor-pointer"
                type="submit"
              >
                انشاء الحساب
              </button>
            )}
          </form>
          <Link to="/doctor/login" className="text-gray-500 mt-2">
            تسجيل الدخول؟
          </Link>
        </div>
      </div>
    </>
  );
}
