import React, { useEffect, useState } from 'react'
import api from '../../services/api.js';
import { useParams } from 'react-router-dom';
import Pagination from '../../utils/Pagination.jsx';
import Loading from '../../utils/Loading.jsx';
import { toast } from 'react-toastify';

export default function AdminUserDetails() {
  const [user, setUser] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [currentPage ,setCurrentPage]= useState(1)
  const[totalPages ,setTotalPages]= useState(1)
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  

  async function GetUser(id) {
    setLoading(true);
    const data = await api.get(`/admin/user/${id}`).catch((e) => {
      console.log(e.response.data.message);
    });
    if (data) {
      
         setUser(data?.data.data);
        setAppointment(data?.data.appointment.docs);
        setTotalPages(data?.data.appointment.totalPages)
      
      setLoading(false);
    }
  }

  async function AddToBlocklist(id) {
    setLoading(true);
    const data = await api
      .put(`/admin/user/addBlocklist/${id}`)
      .catch((e) => {
        console.log(e.response.data.message);
      });
    if (data.status === 200) {
      toast.success(data.data.message);
      GetUser(id);
    }

    setLoading(false);
  }
  async function RemoveToBlocklist(id) {
    setLoading(true);
    const data = await api
      .put(`/admin/users/canceledBlock/${id}`)
      .catch((e) => {
        console.log(e.response.data.message);
      });
    if (data.status === 200) {
      toast.success(data.data.message);
      GetUser(id);
    }

    setLoading(false);
  }

  const gender = {
    female: "انثي",
    mail: "ذكر",
  };

  const appointmentstatus = {
    pending: "انتظار",
    confirmed: "ماكد",
    canceled: "ملغي",
  };
  const statusColors = {
    pending: "bg-green-500 ",
    confirmed: "bg-main-500",
    canceled: "bg-yellow-500",
  };
  const status = {
    pending: "انتظار",
    confirmed: "ماكد",
    canceled: "ملغي",
  };
 const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };

   useEffect(()=>{

    GetUser(id)
   },[])

   console.log(appointment);
   console.log(user);
   const {isBlock ,username ,email ,phone ,createdAt} = user
  return <>

    <div className="flex em:flex-col sm:flex-col w-full py-10  rounded-md justify-center items-start gap-x-10 bg-white em:items-center sm:items-center ">
              {loading ? (
                <>
                <div className="w-full flex justify-center items-center  ">
              <Loading />
            </div>
                </>
              ) : (
                <>
                <div className="flex flex-col">
                 
                 <div className=" my-5 flex flex-col gap-4 items-center em:items-center sm:items-center w-full  text-gray-500 text-sm">
                 <h3 > الاسم : {username}</h3>
                  <h3 >  البريد الالكتروني    :  {email}</h3>
                  <h3 > رقم الهاتف  :  {phone}</h3>
        
                  <h3 >  تاريخ الانضمام      :  {new Date(createdAt).toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: "UTC",
                          })}</h3>
                          
                          <button
                    className={`w-fit h-8 px-2 text-white text-sm rounded-md ${
                      isBlock ? "bg-main" : "bg-red-400"
                    }`}
                    onClick={() => {
                      isBlock ? RemoveToBlocklist(id) : AddToBlocklist(id);
                    }}
                  >
                    {isBlock ? "إلغاء الحظر" : "حظر"}
                  </button>
                 </div>
                 
                  

        

                  
                   
                </div>
                  
                </>
              )} 
             
            </div>  
    <div>
 
    </div>






 
    <div className="w-full rounded-md mx-auto mt-10 overflow-auto ">
        <h3> الحجوزات</h3>
        {/* filter */}
        <div className="bg-white  my-2 rounded-md flex items-center justify-between em:flex-col sm:flex-col  gap-3 p-5">
          {/* <button className="bg-main h-10 rounded-md my-2 px-5 text-white text-sm w-[20%] em:w-full sm:w-full">
            اضافة حجز جديد
          </button> */}
          <div className="w-full">
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
                            className={`bg-opacity-50 rounded-full px-5 text-[12px] p-2 ${statusColors[item.status]
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
}
 