import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api.js";
import { toast } from 'react-toastify';
import { isAuthenticated, userRole } from "../../utils/auth.js";
import Loading from "../../utils/Loading.jsx";
export default function 
UserAddAppointment() {
  const [error, setError] = useState(null);
  const [loading ,setLoading] = useState(false)
  const [available ,setAvailable] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null);

  const Role = userRole()
  
  const { id } = useParams();
  
  let appointment = {
    name: "",
    phone: "",
    gender: "",
    time:""

  };

  let validationSchema = Yup.object({
    name: Yup.string().required("اسم المريض مطلوب"),
    gender: Yup.string().required("النوع مطلوب"),
    phone: Yup.string().required("الرقم مطلوب"),
    time: Yup.string(),
  });
  async function newAppointment(appointmentData) {
    setLoading (true)
    const  {data}  = await api
      .post(`/appointment/add/${id}`, {
        ...appointmentData ,
      time:selectedSlot._id})
      .catch((error) => {
        setError(error.response.data.message);
        
      });
      setLoading(false)
        toast.success(data.message)
        setLoading(false)
      
  }
  let formik = useFormik({
    initialValues: appointment,
    validationSchema,
    onSubmit: newAppointment,
  });

  const getDays = async(id)=>{
    setLoading(true)
     const response  = await api.get(`/time/${id}`).catch((error)=>console.log(setError(error.response?.data?.message)))
     setAvailable(response?.data.data);
    setLoading(false) 
   }


   const daysAr = {
    Monday: 'الإثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت',
    Sunday: 'الأحد',
  };
  

  useEffect(()=>{
    getDays(id)
  },[])

 
  return (
    <>
      <h5 className="bg-main text-white p-5 text-center rounded-md shadow-md shadow-main-50 mb-5">
        تفاصيل الحجز
      </h5>
      <form className="my-5" onSubmit={formik.handleSubmit}>
        <div className="my-2">
          <label htmlFor="name" className="text-gray-700 ">
            اسم المريض
          </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="اسم المريض"
            name="name"
            id="name"
            type="text"
            className="w-full bg-gray-200 p-2 h-12 rounded-md my-2 focus:outline-none"
          />
          {formik.errors.name && formik.touched.name ? (
                <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
        </div>
        <div className="my-2">
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
        <div className="my-2">
          <label htmlFor="gender" className="text-gray-700 ">
            اختار النوع 
          </label>
          <select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="gender"
            className="w-full bg-gray-200  p-2 h-12 rounded-md my-2 focus:outline-none"
          >
            <option value="mail">
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
        <div className="my-2">
          
              {loading ? <>
                <button className=" rounded-md text-white w-full p-4" >
                  <Loading />
                 </button>
              </> : <>
              <div className="flex justify-center items-center gap-5 my-3 ">
             <div> {error ? error : ''}</div>
                
                  {available.map((day,index)=>
                    <div key={index} 
                     onClick={() => setSelectedSlot(day)}
                     className={` ${ selectedSlot === day ? 'bg-main rounded-md cursor-pointer text-white transition duration-500' : 'bg-light rounded-md cursor-pointer'  }`}>
                   <div className="bg-main w-full rounded-md shadow-sm ">
                  <div className="px-2 text-center py-2">
                  <span className="text-sm text-white "  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} >{daysAr[day.day]} </span>
                  </div>
                   </div>

                     <div className="my-3 flex flex-col px-2 ">
                      <span>{day.startTime.replace(/AM/g, "ص")}</span>
                      <span>{day.endTime.replace(/PM/g, "م")}</span>
                     </div>
                    </div>
                 )}
               
                </div>
               
              </>}
        </div>
        {loading ? <>
          <button className="bg-main rounded-md text-white w-full p-4" >
           <Loading />
        </button>
        </>:<>
        {isAuthenticated() &&  Role !== 'doctor' ? <>
      
      {available.length > 0 ? <>
        <button className="bg-main rounded-md text-white w-full p-4" type="submit">
        حجز
      </button>
      </> :<>
     
      <h5>لاتوجد مواعيد متاحة</h5>
      </>}
    
        
      </> :<>
      <Link to={'/login'} >
      <button  className="bg-main rounded-md text-white w-[100%]  p-4 bg-opacity-50 cursor-pointer"  disabled={Role === 'doctor'} >
    
        {Role === 'doctor' ? <>
          ليس لديك صلاحية للحجز
        </> :<>
        تسجيل الدخول للحجز
        </>}
      </button>
      </Link>
      </>}
        </>}
        
      </form>
    </>
  );
}
