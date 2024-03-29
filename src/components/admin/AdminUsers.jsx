import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../utils/Loading.jsx";
import { TbArrowLeft } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../utils/Pagination.jsx";
import api from "../../services/api.js";

export default function AdminUsers() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  const location = useLocation();
  const shouldDisplayTitle = location.pathname !== "/admin";

  const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };

  async function getAllusers() {
    setLoading(true);
    const data = await api.get("/admin/users").catch((e) => {
      console.log(e.response.data.message);
    });
    if (data) {
      setUsers(data?.data.data.docs);
      setTotalPages(data?.data.data.totalPages);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllusers(currentPage);
  }, [currentPage]);

  return (
    <>
      {shouldDisplayTitle && (
        <Helmet>
          <title>المستخدمين</title>
        </Helmet>
      )}
      <div className="w-full rounded-md mx-auto  overflow-auto ">
        {shouldDisplayTitle && (
          <>
            <div className="my-3 flex  justify-between em:flex-col  sm:flex-col ">
              <div>
                <h3> المستخدمين</h3>
                <p className="text-gray-600 text-sm my-1">
                  عرض كل المستخدمين و يمكنك الفلترة
                </p>
              </div>
              <button className="bg-main h-10 rounded-md my-2 px-5 text-white text-sm">
                اضافة مستخدم
              </button>
            </div>
            <div className="flex gap-2">
              <select className="h-10 rounded-md my-2 px-5 text-gray-500">
                <option disabled>صلاحيات</option>
                <option>user</option>
                <option>admin</option>
                <option>all</option>
              </select>
            </div>
          </>
        )}

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
                  <th className="py-5 em:hidden sm:hidde  border-gray-100"> البريد الالكتروني</th>
                  <th className="py-5 em:hidden sm:hidde border-gray-100"> رقم الهاتف</th>
                  <th className="py-5  border-gray-100"> صلاحيات</th>

                  <th className="py-5 em:hidden sm:hidde  border-gray-100"> تاريخ الانضمام</th>
                  <th className="py-5   border-gray-100"> ... </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {users ? (
                  <>
                    {users.map((item, index) => (
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
                          <Link to={`/admin/user/${item._id}`}>
                            <button className="bg-main p-2 rounded-md text-white text-[13px]">
                              <TbArrowLeft />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
            {shouldDisplayTitle && (
             <>
             {users && users.length > 10 ? (
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
