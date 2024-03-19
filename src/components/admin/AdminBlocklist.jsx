import React, { useEffect, useState } from 'react'
import api from '../../services/api.js';
import { TbArrowLeft, TbCircleMinus } from 'react-icons/tb';
import Loading from '../../utils/Loading.jsx';
import { Helmet } from 'react-helmet';
import Pagination from '../../utils/Pagination.jsx';
import { toast } from 'react-toastify';

export default function AdminBlocklist() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 const [blocklist ,setBlocklist] = useState([])
 const [model ,setModel] = useState('doctors')
  async function GetBlockList(pages,model) {
  setLoading(true)
  const data = await api.get(`/admin/${model}/getBlocklist?page=${pages}`).catch((e)=>console.log(e.response.data.message));
  setBlocklist(data?.data.data.docs)
  setTotalPages(data?.data.data.totalPages)
  setLoading(false)
}
const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };


  //handelBloack
  async function handelBloack (id) {
    setLoading(true)
  const data = await api.put(`/admin/${model}/canceledBlock/${id}`).catch((e)=>console.log(e.response.data.message));

  if(data.status === 200){
    toast.success(data.data.message)
    GetBlockList(currentPage ,model)
  }

  setLoading(false)
  }


  // handleModelChange
  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
  setModel(selectedModel); // Update the model type based on dropdown selection
  setCurrentPage(1); // Reset currentPage when model changes to fetch data from the first page
  GetBlockList(1, selectedModel);
  };
  useEffect(()=>{
    GetBlockList(currentPage ,model)
  },[currentPage])
 

  return (<>
      
        <Helmet>
          <title>قائمة الحظر</title>
        </Helmet>
    
      <div className="w-full rounded-md mx-auto  overflow-auto ">
        
          <>
            <div className="my-3 flex  justify-between em:flex-col  sm:flex-col ">
              <div>
               <h3> قائمة الحظر  <span className='text-main'>{model === 'doctors' ? 'الأطباء' : 'المستخدمين'}</span></h3>
                <p className="text-gray-600 text-sm my-1">
                  عرض  قائمة الحظر و يمكنك الفلترة
                </p>
              </div>
              
            </div>
            <div className="flex gap-2">
              <select className="h-10 rounded-md my-2 px-5 text-gray-500 outline-none" onChange={handleModelChange} value={model}>
                <option disabled>العرض</option>
                <option value="users">المستخدمين</option>
                <option value="doctors">الاطباء</option>
               
              </select>
            </div>
          </>
    

        {loading ? (
          <>
            <div className="w-full flex justify-center items-center text-3xl ">
              <Loading />
            </div>
          </>
        ) : (
          <>
            <table className="w-full em:w-full sm:w-full bg-white overflow-auto mx-auto rounded-md text-gray-600 text-center">
              <thead className=" border-gray-100  border-b-2 rounded-md text-sm  ">
                <tr className="py-5 ">
                  <th className="py-5   border-gray-100"> #</th>
                  <th className="py-5  border-gray-100">اسم المستخدم</th>
                  <th className="py-5 em:hidden sm:hidde  border-gray-100"> الايميل</th>
                  <th className="py-5 em:hidden sm:hidde border-gray-100"> رقم الهاتف</th>
                  <th className="py-5  border-gray-100"> صلاحيات</th>

                  <th className="py-5 em:hidden sm:hidde  border-gray-100"> تاريخ الحظر </th>
                  <th className="py-5   border-gray-100"> رفع الحظر </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {blocklist ? (
                  <>
                    {blocklist.map((item, index) => (
                      <tr key={index} className="duration-200 ">
                        <td className="py-2   border-gray-100  border-b-2  px-5  ">
                          {currentPage * 10 + index - 9}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.username}
                        </td>
                        <td className="py-2 em:hidden sm:hidde  border-gray-100  border-b-2  ">
                          {item.email}
                        </td>
                        <td className="py-2  em:hidden sm:hidde border-gray-100  border-b-2 ">
                          {item.phone}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.role}
                        </td>

                        <td className="py-2 em:hidden sm:hidde border-gray-100  border-b-2   ">
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
                          
                            <button onClick={()=>handelBloack(item._id)} className="bg-green-400 p-2 rounded-md text-white text-[13px]">
                              <TbCircleMinus  />
                            </button>
                          
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
           
          
             {blocklist && blocklist.length > 10 ? (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
) : null}
            
          </>
        )}
      </div>
    </>)
}
