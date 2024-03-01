import React, { useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet';
import { AdminContext, useAdmin } from '../../Context/admin.js';
import Loading from '../../utils/Loading.jsx';
import { TbArrowLeft} from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function AdminUsers() {
  const {loading,users,getAllusers} = useContext(AdminContext)

  useEffect(()=>{
    getAllusers()
  },[])
  return <>
      <Helmet>
        <title>المستخدمين</title>
      </Helmet>
      <div className="w-full rounded-md mx-auto mt-10 overflow-auto ">
      <div className=''>
        <button className='bg-main h-10 rounded-md my-2 px-5 text-white text-sm'>اضافة مستخدم</button>
      </div>
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
                  <th className="py-5   border-gray-100"> الايميل</th>
                  <th className="py-5  border-gray-100"> رقم الهاتف</th>
                  <th className="py-5  border-gray-100">  صلاحيات</th>
                  <th className="py-5   border-gray-100">  سعر المقابلة</th>
                  <th className="py-5   border-gray-100"> تاريخ الانضمام</th>
                  <th className="py-5   border-gray-100"> ... </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {users ? (
                  <>
                    {users.map((item, index) => (
                      <tr
                        key={index}
                        className="duration-200 "
                      >
                        <td className="py-2   border-gray-100  border-b-2  px-5  ">
                          {index + 1}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.username}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2  ">
                         {item.email}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                          {item.phone}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                        {item.role}
                        </td>
                        <td className="py-2   border-gray-100  border-b-2 ">
                        {new Date(item.createdAt).toLocaleString('ar-EG', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC',
                          })}
                        </td>

                        <td className="py-2  border-gray-100  border-b-2   ">
                          <span
                            className={`bg-opacity-50 rounded-md text-[12px] p-2 `} 
                          >
                            5
                          </span>
                        </td>
                        <td className="py-2  cursor-pointer  border-gray-100  border-b-2  ">
                        <Link to={`/admin/user/${item._id}`}>
                         <button className='bg-main p-2 rounded-md text-white text-[13px]'><TbArrowLeft/></button>
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
          </>
        )}
      </div>
    </>
}
 