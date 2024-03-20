import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../../utils/Loading.jsx";
import doct1 from "../../Assets/image/doc1.jpg";
import { toast } from "react-toastify";
import Pagination from "../../utils/Pagination.jsx";
import { TbJewishStarFilled } from "react-icons/tb";
export default function AdminDoctorDetails() {
  const [doctorAccount, setDoctorAccount] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [currentPage ,setCurrentPage]= useState(1)
    const[totalPages ,setTotalPages]= useState(1)
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(appointment);
  async function GetDoctor(id) {
    setLoading(true);
    const {data} = await api.get(`/admin/doctor/${id}`).catch((e) => {
      console.log(e.response.data.message);
    });
    if (data) {
      
        setDoctorAccount(data?.data.info);
        setAppointment(data?.data.appointment.docs);
        setTotalPages(data?.data.appointment.totalPages)
      
      setLoading(false);
    }
  }

  async function AddToBlocklist(id) {
    setLoading(true);
    const data = await api
      .put(`/admin/doctors/addBlocklist/${id}`)
      .catch((e) => {
        console.log(e.response.data.message);
      });
    if (data.status === 200) {
      toast.success(data.data.message);
      GetDoctor(id);
    }

    setLoading(false);
  }
  async function RemoveToBlocklist(id) {
    setLoading(true);
    const data = await api
      .put(`/admin/doctors/canceledBlock/${id}`)
      .catch((e) => {
        console.log(e.response.data.message);
      });
    if (data.status === 200) {
      toast.success(data.data.message);
      GetDoctor(id);
    }

    setLoading(false);
  }

// ads doctor
async function AddAds(id) {
  setLoading(true);
  const data = await api
    .put(`/admin/ads/add/${id}`)
    .catch((e) => {
      console.log(e.response.data.message);
    });
  if (data.status === 200) {
    toast.success(data.data.message);
    GetDoctor(id);
  }

  setLoading(false);
}

async function RemoveAds(id) {
  setLoading(true);
  const data = await api
    .put(`/admin/ads/remove/${id}`)
    .catch((e) => {
      console.log(e.response.data.message);
    });
  if (data.status === 200) {
    toast.success(data.data.message);
    GetDoctor(id);
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

  const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };
  useEffect(() => {
    GetDoctor(id);
  }, []);

  const { username, email,  location, price, isBlock, createdAt, ads ,phone ,bio ,accountComplite } =
    doctorAccount;

  return (
    <>
      <Helmet>
        {loading ? (
          ""
        ) : (
          <title>
            {" "}
            د /
            {username ? username : "تفاصيل الدكتور"}
          </title>
        )}
      </Helmet>

    
          <div className=" w-full py-9 mb-10 mx-auto em:text-center sm:text-center">
            <div className="flex em:flex-col sm:flex-col w-full py-10 rounded-md justify-center items-start gap-x-10 bg-white em:items-center sm:items-center ">
              {loading ? (
                <>
                <div className="w-full flex justify-center items-center  ">
              <Loading />
            </div>
                </>
              ) : (
                <>
                 <div className="flex flex-col gap-5 items-start ">
                 <img
                    src={doct1}
                    alt={username}
                    className="w-40 rounded-full object-cover h-40"
                  />
                   <div className="flex gap-4">
                   <button
                    className={`w-fit h-8 px-5 text-white text-sm rounded-md ${
                      isBlock ? "bg-main" : "bg-red-400"
                    }`}
                    onClick={() => {
                      isBlock ? RemoveToBlocklist(id) : AddToBlocklist(id);
                    }}
                  >
                    {isBlock ? "إلغاء الحظر" : "حظر"}
                  </button>

        

                  <button
                    className={`w-fit h-8 px-5 text-white text-sm rounded-md ${
                      ads ? "bg-main-300" : "bg-main"
                    }`}
                    onClick={() => {
                      ads ? RemoveAds(id) : AddAds(id);
                    }}
                  >
                    {ads ? "إلغاء التميز" : "اضافة الي التميز "}
                  </button>
                   </div>

                   <div>
                     <h6 className="text-sm text-gray-500">
                      حالة الحساب : 
                      <span className={`text-sm mx-2   ${accountComplite  ? 'text-green-400' : 'text-gray-400'}`}>
                        {accountComplite ? 'مكتمل' : 'غير مكتمل'}
                      </span>
                     </h6>
                  </div>
                 </div>
                 <div className="my-5 flex flex-col gap-4 items-start em:items-center sm:items-center  text-gray-500 text-sm">
                 <h3 > د / {username}</h3>
                  <h3 >  البريد الالكتروني    :  {email}</h3>
                  <h3 > رقم الهاتف  :  {phone}</h3>
                  <h3 >  سعر المقابلة    :  {price}</h3>
                  <h3 >  تاريخ الانضمام      :  {new Date(createdAt).toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: "UTC",
                          })}</h3>
                  <p >
                    <span>الموقع : </span>
                    {location}
                  </p>
                  <p>
                    <span>الوصف : </span>
                    {bio}
                  </p>
                 </div>
                  
                </>
              )} 
            
            </div> 
           
           
          </div>
    
    {/* appoientment */}
    {loading ? (
          <>
            <div className="w-full flex justify-center items-center  ">
              <Loading />
            </div>
          </>
        ) : (
          <>
           <h4 className="my-2 text-gray-500">الحجوزات</h4>
            <table className="w-full bg-white overflow-auto mx-auto rounded-md text-center text-gray-600">
              <thead className=" border-gray-100  border-b-2 rounded-md">
                <tr className="py-5 text-sm">
                  <th className="py-5   border-gray-100"> #</th>
                  <th className="py-5  border-gray-100">اسم المريض</th>
                  
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
                            className={`bg-opacity-50 rounded-md text-[12px] p-2 ${statusColors[item.status]
                              }`}
                          >
                            {appointmentstatus[item.status]}
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
    </>
  );
}
