import React, { useEffect} from 'react'
import { Helmet } from 'react-helmet';
import { useAdmin} from '../../Context/admin.js';
import Loading from '../../utils/Loading.jsx';

export default function AdminAppointments() {

 
  const {loading,appointment,getAllAppoientment} =useAdmin()
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
  useEffect(()=>{
    getAllAppoientment() 
  },[])
  const sortedItems = appointment.sort((a, b) => new Date(b.date) - new Date(a.date));

  return <>
      <Helmet>
        <title>الحجوزات</title>
      </Helmet>
      <div className="w-full rounded-md mx-auto mt-10 overflow-auto ">
      <h3> الحجوزات</h3>
      {/* filter */}
      <div className='bg-white  my-2 rounded-md flex items-center justify-between em:flex-col sm:flex-col  gap-3 p-5'>
        <button className='bg-main h-10 rounded-md my-2 px-5 text-white text-sm em:w-full sm:w-full'>اضافة حجز جديد</button>
        <div className=''>
           <form className='flex items-center em:flex-col sm:flex-col gap-3'>
           <input placeholder='اسم الطبيب' className='border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full'/>
           <input placeholder='اسم المريض' className='border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full'/>
           <input placeholder='رقم التزكرة ' className='border-gray-200 border rounded-md h-8 p-4 text-sm mx-2 outline-none w-full'/>

           <select className='p-2 border-gray-200 border rounded-md text-sm text-gray-400 px-4 outline-none w-full'>
            <option disabled>الحالة</option>
            <option  className='my-3'>انتظار</option>
            <option  className='my-3'>مأكد</option>
            <option className='my-3'>ملغي</option>
           </select>
           <button className='mx-2 bg-main text-white  w-28 rounded-md p-2'>بحث</button>
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
                  <th className="py-5   border-gray-100"> التفاصيل</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {appointment  ? (
                  <>
                    {sortedItems.map((item, index) => (
                      <tr
                        key={index}
                        className="duration-200 "
                      >
                        <td className="py-2   border-gray-100  border-b-2  px-5  ">
                          {index + 1}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.name}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2  ">
                         {item.doctorId.username}
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

                        <td className="py-2  border-gray-100  border-b-2   ">
                          <span
                            className={`bg-opacity-50 rounded-md text-[12px] p-2 ${
                              statusColors[item.status]
                            }`}
                          >
                            {status[item.status]}
                          </span>
                        </td>
                        <td className="py-2  cursor-pointer  border-gray-100  border-b-2  ">
                          <button>عرض</button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <h6>لاتوجد حجوزات</h6>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
}
