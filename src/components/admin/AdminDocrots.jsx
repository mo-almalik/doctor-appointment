import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../utils/Loading.jsx";
import { TbArrowLeft } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../utils/Pagination.jsx";
import api from "../../services/api.js";

export default function AdminDocrots() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const shouldDisplayTitle = location.pathname !== "/admin";

  const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };
  // get all doctors
  async function getAllDocotrs(pages) {
    setLoading(true);
    const data = await api.get(`/admin/doctors?page=${pages}`).catch((e) => {
      console.log(e.response.data.message);
    });
    if (data) {
      setDoctors(data?.data.data.docs);
      setTotalPages(data?.data.data.totalPages);
    }
    setLoading(false);
  }
  useEffect(() => {
    getAllDocotrs(currentPage);
  }, [currentPage]);

  const initialValues = {
    username: '',
    phone: '',
    email: '',

  }
  const validationSchema = Yup.object({
    username: Yup.string(),
    phone: Yup.string(),
    email: Yup.string(),
   
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

      const res = await api.get(`/admin/doctors/filter?${queryString}`);
      if (res.status === 200) {
        setDoctors(res.data?.data.docs);
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
          <title>الأطباء</title>
        </Helmet>
      )}

      <div className="w-full  rounded-md mx-auto  overflow-auto ">
        {shouldDisplayTitle && (
          <>
            <div className="my-3 ">
              <h3> الأطباء</h3>
              <p className="text-gray-600 text-sm my-1">
                عرض كل الاطباء
              </p>
            </div>
            <div className=" bg-white  my-2 rounded-md flex items-center justify-between em:flex-col sm:flex-col  p-5 gap-2 w-full">
            <div className="w-full">
            <form className="flex items-center em:flex-col sm:flex-col gap-3 " onSubmit={formik.handleSubmit}>

              <input
                placeholder="اسم الطبيب "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="text"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input
                placeholder="ايميل "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              
              <input
                placeholder="رقم الهاتف "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
                type="tel"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />


              
              <button className="mx-2 bg-main text-white  w-28 rounded-md p-2" type='submit'>
                بحث
              </button>
            </form>
          </div>

            </div>
            
          </>
          
        )}
      
        {loading ? (
          <>
            <div className="w-full flex justify-center items-center text-3xl  text-center">
              <Loading />
            </div>
          </>
        ) : (
          <>
            <table className="w-full em:w-full sm:w-full bg-white overflow-auto mx-auto rounded-md text-gray-600 text-center">
              <thead className=" border-gray-100  border-b-2 rounded-md text-sm  ">
                <tr className="py-5 ">
                  <th className="py-5  border-gray-100"> #</th>
                  <th className="py-5 border-gray-100">اسم الدكتور</th>
                  <th className="py-5  border-gray-100 em:hidden sm:hidde"> الموقع</th>
                  <th className="py-5  border-gray-100 em:hidden sm:hidde"> رقم الهاتف</th>
                  <th className="py-5  border-gray-100 em:hidden sm:hidde"> سعر المقابلة</th>
                  <th className="py-5  border-gray-100 em:hidden sm:hidde"> التخصص </th>
                  <th className="py-5  border-gray-100 em:hidden sm:hidde"> تاريخ الانضمام</th>
                  <th className="py-5  border-gray-100"> ... </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {doctors ? (
                  <>
                    {doctors.map((item, index) => (
                      <tr key={index} className="duration-200 ">
                        <td className="py-2   border-gray-100  border-b-2  px-5  ">
                          {currentPage * 10 + index - 9}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.username}
                        </td>
                        <td className="py-2 em:hidden sm:hidde  border-gray-100  border-b-2  ">
                          {item.location ? item.location : "-"}
                        </td>
                        <td className="py-2  em:hidden sm:hidde border-gray-100  border-b-2 ">
                          {item.phone}
                        </td>
                        <td className="py-2  em:hidden sm:hidde border-gray-100  border-b-2 ">
                          {item.price ? item.price : "-"}
                        </td>
                        <td className="py-2  em:hidden sm:hidde border-gray-100  border-b-2 ">
                          {item.specialization}
                        </td>

                        <td className="em:hidden sm:hidde npy-2  border-gray-100  border-b-2   ">
                          <span
                            className={`bg-opacity-50 rounded-md text-[12px] p-2 `}
                          >
                            {new Date(item.createdAt).toLocaleString("ar-EG", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              timeZone: "UTC",
                            })}
                          </span>
                        </td>
                        <td className="py-2  cursor-pointer  border-gray-100  border-b-2  ">
                          <Link to={`/admin/doctor/${item._id}`}>
                            <button className="bg-main p-2 rounded-md text-white text-[13px]">
                              <TbArrowLeft />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <h6>لاتوجد حجوزات</h6>
                )}
              </tbody>
            </table>
            {shouldDisplayTitle && (
              <>
              {doctors && doctors.length > 10 ? (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
) : null}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
