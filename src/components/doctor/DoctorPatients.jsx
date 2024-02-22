
    
    import React, { useEffect, useState } from "react";
    import api from "../../services/api.js";
    import {
      TbEye,
      TbSquareRoundedMinus,
      TbSquareRoundedPlus,
      TbSquareRoundedX,
    } from "react-icons/tb";
   
    import Loading from "../../utils/Loading.jsx";
    import { Helmet } from "react-helmet";
    import { toast } from "react-toastify";
    
    export default function DoctorPatients() {
      const [appointment, setAppointment] = useState([]);
      const [loading, setLoading] = useState(false);
    
      const getMyAppointment = async () => {
        setLoading(true);
        const { data } = await api
          .get("/doctor/patients")
          .catch((e) => console.log(e.response.data.message));
        setAppointment(data.data);
    
        setLoading(false);
      };
    

    
      useEffect(() => {
        getMyAppointment();
      }, []);
    
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
      return (
        <>
          <Helmet>
            <title>الحجوزات</title>
          </Helmet>
          <div className="w-full  text-center  rounded-md mx-auto mt-10 overflow-auto ">
            {loading ? (
              <>
                <div className="w-full flex justify-center items-center text-3xl  ">
                  <Loading />
                </div>
              </>
            ) : (
              <>
                <table className="w-full em:w-full sm:w-full bg-white overflow-auto mx-auto rounded-md ">
                  <thead className=" border-gray-100  border-b-2 rounded-md">
                    <tr className="py-5 text-sm">
                      <th className="py-5   border-gray-100"># </th>
                      <th className="py-5  border-gray-100">اسم المريض</th>
                      <th className="py-5  border-gray-100"> رقم الهاتف</th>
                      <th className="py-5   border-gray-100"> النوع</th>
    
                      <th className="py-5   border-gray-100"> رقم التزكرة </th>
                      <th className="py-5   border-gray-100"> الحالة</th>
                    </tr>
                  </thead>
    
                  <tbody className="  text-sm">
                    {appointment ? (
                      <>
                        {appointment.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-200 duration-200 "
                          >
                            <td className="py-2   border-gray-100  border-b-2  px-5 w-[60px] ">
                              {index +1}
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
    
                            <td className="py-2   border-gray-100  border-b-2  px-5 ">
                              {item.visitNo}
                            </td>
                            <td className="py-2   border-gray-100  border-b-2  center flex justify-center items-center">
                              
                              
                              <button
                               
                                className={`flex justify-center items-center ${item.status === 'confirmed' || item.status === 'canceled' ? 'bg-red-300 cursor-not-allowed' :'bg-red-400 hover:bg-red-500' }  p-2  text-white rounded-md duration-200 w-9 h-9 mx-1`}
                                 disabled={item.status === 'confirmed' || item.status === 'canceled'}
                              >
                                <TbSquareRoundedPlus className="text-md w-9 h-9" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h6>لاتوجد مشاريع</h6>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      );
    }
