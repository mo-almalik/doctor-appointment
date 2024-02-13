import React, { useEffect, useState } from 'react'
import api from '../../services/api.js'
import { TbEye } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Loading from '../../utils/Loading.jsx';

export default function UserAppointment() {
  const [appointment ,setAppointment] = useState([])
  const [loading ,setLoading] = useState(false)


  const getMyAppointment = async()=>{
    setLoading(true)
    const {data} = await api.get('/user/appointments').catch((error)=>console.log(error));
    setAppointment(data.data)
    console.log(data);
    setLoading(false)
  }


  useEffect(()=>{
    
  getMyAppointment();
 
  },[])
  return <>
    
    <div className='w-full  text-center  rounded-md mx-auto mt-10 overflow-auto px-10 '>
    {loading ? <>
    <div className='w-full flex justify-center items-center text-3xl  '>
  <Loading  />
  </div>
  </> : <>
  <table className='w-full em:w-full sm:w-full bg-white overflow-auto mx-auto rounded-md '>
  <thead className='border border-gray-300 rounded-md'>
    <tr className='py-5 text-sm'>
      <th className='py-5 border-s-2  border-gray-100'>رقم التزكرة</th>
      <th className='py-5 border-s-2 border-gray-100'>اسم  المريض</th>
      <th className='py-5 border-s-2 border-gray-100'>   رقم الهاتف</th>
      <th className='py-5 border-s-2  border-gray-100'>  النوع</th>
    
      <th className='py-5 border-s-2  border-gray-100'>  حالة الطلب</th>
      <th className='py-5 border-s-2  border-gray-100'>  الحالة</th>
    </tr>
  </thead>
 
  <tbody className='border border-gray-300 text-sm '>

  {appointment ? <>
      {appointment.map((item,index)=> <tr key={index}>
      <td className='py-2 border-s-2  border-gray-100  border-b-2 px-5 w-[60px]'>#{item.visitNo}</td>
      <td className='py-2 border-s-2  border-gray-100  border-b-2'>{item.name}</td>
      <td className='py-2 border-s-2  border-gray-100  border-b-2'>{item.phone}</td>
      <td className='py-2 border-s-2  border-gray-100  border-b-2'>{item.gender  }</td>

      <td className='py-2 border-s-2  border-gray-100  border-b-2 px-5 '>
      <span className='bg-green-300 bg-opacity-50 rounded-md text-[12px] p-2'>{item.status}</span>
      </td>
      <td className='py-2 border-s-2  border-gray-100  border-b-2 center'>
      <Link to={`/appointment/${item._id}`} className='flex justify-center items-center'><TbEye  className='bg-red-400 hover:bg-red-500  p-2 text-xl text-white rounded-md duration-200 w-10 h-10 mx-1' /></Link>
        
      </td>
    </tr>
      )}
    </>: <h6>لاتوجد  مشاريع</h6>}
 
  </tbody>
</table>
  </>}

</div>
  </>
}
 