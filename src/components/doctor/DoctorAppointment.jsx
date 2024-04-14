import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TbSquareRoundedMinus,
  TbSquareRoundedPlus,
} from "react-icons/tb";
import { useLocation } from "react-router-dom";
import Loading from "../../utils/Loading.jsx";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Pagination from "../../utils/Pagination.jsx";

export default function DoctorAppointment() {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const[totalPages ,setTotalPages]= useState(1)
  const [currentPage ,setCurrentPage]= useState(1)
  
  const location = useLocation();
  const shouldDisplayTitle = location.pathname !== '/cms';


  async function getMyAppointment(pages) {
    setLoading(true);
    const  data  = await api
      .get(`/doctor/my-appointment?page=${pages}`)
      .catch((e) => console.log(e.response.data.message));
    setAppointment(data?.data.appointments.docs);
    setTotalPages(data?.data.appointments.totalPages)
  

    setLoading(false);
  };

  async function StatusChange(stats, id) {
    setLoading(true);
    const { data } = await api
      .put("/doctor/appointment/", {
        stats,
        id,
      })
      .catch((e) => console.log(e.response.data.message));

    if (data.success === true) {
      toast.success(data.message);
    }

    setTimeout(() => {
      getMyAppointment();
      setLoading(false);
    }, 1000);
  }


  useEffect(() => {
    getMyAppointment(currentPage);
  }, [currentPage]);
 

  const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };
  const gender = {
    female: "انثي",
    mail: "ذكر",
  };

  const status = {
    pending: "انتظار",
    confirmed: "ماكد",
    canceled: "ملغي",
  };
  const statusColors = {
    pending: "bg-green-500 ",
    confirmed: "bg-main-500",
    canceled: "bg-yellow-500",
  };
  

  const initialValues = {
    visitNo: '',
    phone: '',
    status: '',
    name: '',
  }
  const validationSchema = Yup.object({
    visitNo: Yup.string(),
    phone: Yup.string(),
    status: Yup.string(),
    name: Yup.string(),
  })
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      filter(values);
    }

  });

 

  async function filter(values) {
   
    setLoading(true);
    try {
      const queryString = Object.keys(values)
        .filter(key => values[key] !== '') // Filter out empty strings to avoid unnecessary query parameters
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(values[key])}`)
        .join('&');

      const res = await api.get(`/doctor/filter?${queryString}`);
      if (res.status === 200) {
        setAppointment(res.data?.data.docs);
        setTotalPages(res.data.data.totalPages);
      } else {
        // Handle other status codes or error situations
        console.error('Failed to fetch data:', res.status);
      }
    } catch (e) {
      console.error('Failed to fetch data:', e);
    }
    setLoading(false);
  }
  return (
    <>
       {shouldDisplayTitle && (
        <Helmet>
          <title>الحجوزات</title>
        </Helmet>
      )}

{shouldDisplayTitle && ( <>
              {/* filter */}
              <div className="bg-white  my-2 rounded-md flex items-center justify-between em:flex-col sm:flex-col  gap-3 p-5">
          {/* <button className="bg-main h-10 rounded-md my-2 px-5 text-white text-sm w-[20%] em:w-full sm:w-full">
            اضافة حجز جديد
          </button> */}
          <div className="w-full">
            <form className="flex items-center em:flex-col sm:flex-col gap-3 " onSubmit={formik.handleSubmit}>

              <input
                placeholder="رقم التزكرة "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="number"
                name="visitNo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input
                placeholder="رقم الهاتف "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="text"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input
                placeholder="اسم المريض"
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="text"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />


              <select className="p-2 border-gray-200 border rounded-md text-sm text-gray-400 px-4 outline-none w-full"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="status"  >
                <option disabled>الحالة</option>
                <option className="my-3" value={'pending'}>انتظار</option>
                <option className="my-3" value={'confirmed'}>مأكد</option>
                <option className="my-3" value={'canceled'}>ملغي</option>
              </select>
              <button className="mx-2 bg-main text-white  w-28 rounded-md p-2" type='submit'>
                بحث
              </button>
             
            </form> 
            <button onClick={()=>getMyAppointment()} className="mx-2  w-1/2   bg-main-500 text-white my-2 rounded-md p-2" type='submit'>
                عرض الكل
              </button>
          </div>
        </div>
        {/* filter */}
</>
  
)}
      <div className="w-full  text-center  rounded-md mx-auto mt-10 overflow-auto ">
        {loading ? (
          <>
            <div className="w-full flex justify-center items-center text-3xl  ">
              <Loading />
            </div>
          </>
        ) : (
          <>
            <table className="w-full em:w-full sm:w-full bg-white overflow-auto mx-auto rounded-md ">
              <thead className=" border-gray-100  border-b-2 rounded-md">
                <tr className="py-5 text-sm">
                  <th className="py-5   border-gray-100">رقم التزكرة</th>
                  <th className="py-5  border-gray-100">اسم المريض</th>
                  <th className="py-5  border-gray-100"> رقم الهاتف</th>
                  <th className="py-5   border-gray-100"> النوع</th>
                  <th className="py-5   border-gray-100"> التاريخ</th>
                  <th className="py-5   border-gray-100"> حالة الطلب</th>
                  <th className="py-5   border-gray-100"> الحالة</th>
                </tr>
              </thead>

              <tbody className="  text-sm">
                {appointment ? (
                  <>
                    {appointment.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-200 duration-200 "
                      >
                        <td className="py-2   border-gray-100  border-b-2  px-5 w-[60px] ">
                          #{item.visitNo}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.name}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.phone}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {gender[item.gender]}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                        {new Date(item.date).toLocaleString('ar-EG', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC',
                          })}
                        </td>

                        <td className="py-2   border-gray-100  border-b-2  px-5 ">
                          <span
                            className={`bg-opacity-50 rounded-md text-[12px] p-2 ${
                              statusColors[item.status]
                            }`}
                          >
                            {status[item.status]}
                          </span>
                        </td>
                        <td className="py-2   border-gray-100  border-b-2  center flex justify-center items-center">
                          <button
                            onClick={() => StatusChange("confirmed", item._id)}
                            className={`flex justify-center items-center ${item.status === 'confirmed' || item.status === 'canceled' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-800 hover:bg-green-500'} p-2 text-sm text-white rounded-md duration-200 w-9 h-9`}
                            disabled={item.status === 'confirmed' || item.status === 'canceled'}
                          >
                            <TbSquareRoundedMinus className=" w-9 h-9 text-md" />
                          </button>
                          
                          <button
                            onClick={() => StatusChange("canceled", item._id)}
                            className={`flex justify-center items-center ${item.status === 'confirmed' || item.status === 'canceled' ? 'bg-red-300 cursor-not-allowed' :'bg-red-400 hover:bg-red-500' }  p-2  text-white rounded-md duration-200 w-9 h-9 mx-1`}
                             disabled={item.status === 'confirmed' || item.status === 'canceled'}
                          >
                            <TbSquareRoundedPlus className="text-md w-9 h-9" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <h6>لاتوجد مشاريع</h6>
                )}
              </tbody>
              
            </table> 
            <>
          {appointment && appointment.length > 0 ? (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
) : null}
          </>
          </>
        )}
      </div>
    </>
  );
}
