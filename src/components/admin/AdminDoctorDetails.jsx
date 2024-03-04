import React, { useEffect } from 'react'
import { useAdmin } from '../../Context/admin.js'
import { useParams } from 'react-router-dom'
import Loading from '../../utils/Loading.jsx'

export default function AdminDoctorDetails() {
  const {loading,GetDoctor,doctorAccount} = useAdmin()
  const {id} = useParams()
  useEffect(()=>{
    GetDoctor(id)
  },[])
  console.log(doctorAccount);
  const info = doctorAccount?.info;
  const appointment = doctorAccount?.appointment;
  const count = doctorAccount?.appointmentCount


  // const sortedItems = doctorAccount?.appointment.sort((a, b) => new Date(b.date) - new Date(a.date));

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
  return <>
     <div className=' flex  items-start gap-4 em:flex-col sm:flex-col w-full'>
  <div className='bg-white h-52 rounded-md  w-full em:w-full sm:w-full'>
    <div className='flex flex-col justify-center items-center mt-8'>
    {loading ? <>

    </> : <>

    </>}
     <h4> د/ <span>{info.username}</span></h4>

     <h4> <span className='mx-2'>التخصص :</span> {info.specialization ? info.specialization : <span>لايوجد</span>}</h4>
     
     
     {/* <h4>{ item.rating ? getStarIcons(item.rating)   : "" } </h4> */}
     <div className='flex justify-between items-center w-full px-5 em:flex-col sm:flex-col em:gap-2'>
      <div className=' text-gray-600'>
       <span>سعر المقابلة :</span>
       
       {/* <span className='mx-5'>{info.price ? info.price : <span>لايوجد</span>}</span> */}
       </div>
      <div className=' bg-green-400 p-2 rounded-md text-white'>
        <span className='mx-2'>الحالة</span>
        {info.status}
      </div>
      <div>
        {count}
      </div>
     </div>
    </div>
  </div>



  </div>

  <div className="w-full rounded-md mx-auto mt-10 overflow-auto ">
      <h3 className='text-gray-500 mb-2'>  الحجوزات</h3>
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
                  <th className="py-5   border-gray-100"> رقم التزكرة</th>
                  <th className="py-5  border-gray-100">اسم المريض</th>
                  
                  <th className="py-5  border-gray-100"> رقم الهاتف</th>
                  <th className="py-5   border-gray-100"> النوع</th>
                  <th className="py-5   border-gray-100"> تاريخ الحجز</th>
                  <th className="py-5   border-gray-100"> حالة الطلب</th>

                </tr>
              </thead>

              <tbody className="text-sm">
                {appointment  ? (
                  <>
                    {appointment.map((item, index) => (
                      <tr
                        key={index}
                        className="duration-200 "
                      >
                        <td className="py-2   border-gray-100  border-b-2  px-5  ">
                          # {item.visitNo}
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
 