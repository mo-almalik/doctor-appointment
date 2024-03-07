import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbArrowLeft, TbChecks } from "react-icons/tb";
import Loading from '../../utils/Loading.jsx';
import { Helmet } from 'react-helmet';
import Pagination from '../../utils/Pagination.jsx';
import api from '../../services/api.js';
import { toast } from 'react-toastify';

export default function AdmainNewDoctors() {
  const location = useLocation();
  const shouldDisplayTitle = location.pathname !== "/admin";
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctors, setDoctors] = useState([]);

  async function getNewDoctors(pages){
    setLoading(true)
    const data =await api.get(`/admin/new-add?page=${pages}`).catch((e) => {
      console.log(e.response.data.message);
    });
    if (data) {
      setDoctors(data?.data.data.docs);
      setTotalPages(data?.data.data.totalPages);
    }
    setLoading(false)
  }

  const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };

  async function Accepted(id ,stats){
    setLoading(true)
    const data = await api.put(`admin/stauts`,{
      id,
      stats
    }).catch((e) => {
      console.log(e.response.data.message);
    });
    if (data.status === 200) {
      toast.success(data.data.message);
      getNewDoctors(currentPage)
    }
    setLoading(false)

  }
  useEffect(()=>{
 getNewDoctors(currentPage)
  },[currentPage])
  return  <>
  {shouldDisplayTitle && (
    <Helmet>
      <title>طلبات الاطباء الجدد</title>
    </Helmet>
  )}

  <div className="w-full  rounded-md mx-auto  overflow-auto ">
    {shouldDisplayTitle && (
      <>
        <div className="my-3 ">
          <h3> طلبات الأطباء</h3>
          <p className="text-gray-600 text-sm my-1">
             طلبات انضمام لعافية 
          </p>
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
              <th className="py-5 em:hidden sm:hidde border-gray-100"> الموقع</th>
              <th className="py-5 em:hidden sm:hidde border-gray-100"> رقم الهاتف</th>
              <th className="py-5 em:hidden sm:hidde border-gray-100"> سعر المقابلة</th>
              <th className="py-5 em:hidden sm:hidde border-gray-100"> التخصص </th>
              <th className="py-5 em:hidden sm:hidde border-gray-100"> تاريخ الانضمام</th>
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
                    <td className="py-2 em:hidden sm:hiddeem:hidden sm:hidde  border-gray-100  border-b-2  ">
                      {item.location ? item.location : "-"}
                    </td>
                    <td className="py-2 em:hidden sm:hiddeem:hidden sm:hidde  border-gray-100  border-b-2 ">
                      {item.phone}
                    </td>
                    <td className="py-2 em:hidden sm:hiddeem:hidden sm:hidde  border-gray-100  border-b-2 ">
                      {item.price ? item.price : "-"}
                    </td>
                    <td className="py-2  em:hidden sm:hiddeem:hidden sm:hidde border-gray-100  border-b-2 ">
                      {item.specialization}
                    </td>

                    <td className="py-2 em:hidden sm:hiddeem:hidden sm:hidde border-gray-100  border-b-2   ">
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
                   
                        <button
                        onClick={()=>Accepted(item._id ,'accepted')}
                         className="bg-main p-2 rounded-md text-white text-[13px]">
                          <TbChecks  />
                        </button>
                     
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <h6>لاتوجد طلبات</h6>
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
}
