import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

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

  const status = {
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
            <form className="flex items-center em:flex-col sm:flex-col gap-3 ">
              <input
                placeholder="اسم الطبيب"
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
              />
              <input
                placeholder="اسم المريض"
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
              />
              <input
                placeholder="رقم التزكرة "
                className="border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full"
              />

              <select className="p-2 border-gray-200 border rounded-md text-sm text-gray-400 px-4 outline-none w-full">
                <option disabled>الحالة</option>
                <option className="my-3">انتظار</option>
                <option className="my-3">مأكد</option>
                <option className="my-3">ملغي</option>
              </select>
              <button className="mx-2 bg-main text-white  w-28 rounded-md p-2">
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
                  <th className="py-5   border-gray-100"> حالة الطلب</th>
                
                </tr>
              </thead>

              <tbody className="text-sm">
                {appointment ? (
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

                        <td className="py-2  border-gray-100  border-b-2   ">
                          <span
                            className={` rounded-full px-5 text-[12px] p-2 ${statusColors[item.status]
                              }`}
                          >
                            {status[item.status]}
                          </span>
                        </td>
                        
                      </tr>
                    ))}
                  </>
                ) : (
                  <h6>لاتوجد حجوزات</h6>
                )}
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
