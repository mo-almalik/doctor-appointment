import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../utils/Loading.jsx";
import Pagination from "../../utils/Pagination.jsx";
import api from "../../services/api.js";

export default function AdminAppointments() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appointment, setAppointment] = useState([]);


  const gender = {
    female: "انثي",
    mail: "ذكر",
  };

  const statusAr = {
    pending: "انتظار",
    confirmed: "ماكد",
    canceled: "ملغي",
  };
  const statusColors = {
    pending: "bg-green-200 bg-opacity-100 text-gray-800 ",
    confirmed: "bg-main-200 bg-opacity-100 text-gray-800",
    canceled: "bg-yellow-200 bg-opacity-100 text-gray-800",
  };
  //get all appoientment
  async function getAllAppoientment(pages) {
    setLoading(true);
    const data = await api
      .get(`/admin/appointments?page=${pages}`)
      .catch((e) => {
        console.log(e.response.data.message);
      });
    if (data) {
      setAppointment(data?.data.data.docs);
      setTotalPages(data.data.data.totalPages);
    }
    setLoading(false);
  }
  useEffect(() => {
    getAllAppoientment(currentPage);
  }, [currentPage]);
  const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };


  const initialValues = {
    visitNo: '',
    phone: '',
    status: '',
  }
  const validationSchema = Yup.object({
    visitNo: Yup.string(),
    phone: Yup.string(),
    status: Yup.string(),
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

      const res = await api.get(`/appointment/filter?${queryString}`);
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
      <Helmet>
        <title>الحجوزات</title>
      </Helmet>
      <div className="w-full rounded-md mx-auto mt-10 overflow-auto ">
        <h3> الحجوزات</h3>
        {/* filter */}
        <div className="bg-white  my-2 rounded-md flex items-center justify-between em:flex-col sm:flex-col  gap-3 p-5">
          {/* <button className="bg-main h-10 rounded-md my-2 px-5 text-white text-sm w-[20%] em:w-full sm:w-full">
            اضافة حجز جديد
          </button> */}
          <div className="">
            <form className="flex items-center em:flex-col sm:flex-col gap-3 " onSubmit={formik.handleSubmit}>

              <input
                placeholder="رقم التزكرة "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="text"
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
          </div>
        </div>
        {/* filter */}
        {loading ? (
          <>
            <div className="w-full flex justify-center items-center text-3xl  ">
              <Loading />
            </div>
          </>
        ) : (
          <>
            <table className="w-full em:w-full sm:w-full bg-white overflow-auto mx-auto rounded-md text-center text-gray-600">
              <thead className=" border-gray-100  border-b-2 rounded-md">
                <tr className="py-5 text-sm">
                  <th className="py-5   border-gray-100"> #</th>
                  <th className="py-5  border-gray-100">اسم المريض</th>
                  <th className="py-5  border-gray-100">اسم الدكتور</th>
                  <th className="py-5  border-gray-100"> رقم الهاتف</th>
                  <th className="py-5   border-gray-100"> النوع</th>
                  <th className="py-5   border-gray-100"> تاريخ الحجز</th>
                  <th className="py-5   border-gray-100">  رقم التزكرة</th>
                  <th className="py-5   border-gray-100"> حالة الطلب</th>

                </tr>
              </thead>

              <tbody className="text-sm">
                {appointment ? 
                  <>
                    {appointment.map((item, index) => (
                      <tr key={index} className="duration-200 ">
                        <td className="py-2   border-gray-100  border-b-2  px-5  ">
                          {currentPage * 10 + index - 9}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.name}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2  ">
                          {item.doctorId?.username}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.phone}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {gender[item.gender]}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {new Date(item.date).toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: "UTC",
                          })}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.visitNo}
                        </td>
                        <td className="py-2  border-gray-100  border-b-2   ">
                          <span
                            className={` rounded-full px-5 text-[12px] p-2 ${statusColors[item.status]
                              }`}
                          >
                            {statusAr[item.status]}
                          </span>
                        </td>

                      </tr>
                    )) } 
                  </>
                 : <><span>لاتوجد حجوزات</span></>}
              </tbody>
            </table>
            {appointment && appointment.length > 0 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
