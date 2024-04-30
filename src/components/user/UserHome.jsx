import React, { useContext, useEffect} from 'react'
import { TbArrowNarrowLeft } from "react-icons/tb";

import { Link } from 'react-router-dom';
import doct1 from '../../Assets/image/doc2.jpg'
import { Helmet } from 'react-helmet';
import { DoctorContext} from '../../Context/doctor.js';
import Doctor from './Doctor.jsx';
export default function UserHome() {
  const {adsDoctor,GetDoctorsAds} = useContext(DoctorContext);
 useEffect(()=>{

  GetDoctorsAds()
 },[])
  
  return <>
  <Helmet>
    <title>عافية</title>
  </Helmet>
    <div className='container mx-auto bg-white bg-opacity-50 h-[500px] rounded-md mt-8 em:text-center'>
        <div className='flex justify-center items-center w-full h-full em:flex-col sm:flex-col'>
          <div className=' w-1/2 em:w-full sm:w-full'>
            <div className='flex  flex-col items-start justify-center px-10 em:px-5 my-3 em:items-center sm:items-center'>
              <h1 className='font-bold text-2xl text-main em:font-normal em:text-md '>  <strong className='text-gray-700  py-3 rounded-md'>عافـــية ,</strong> كل الأطباء في مكان واحد</h1>
              <p className='mt-7 text-gray-500 w-[60%] leading-8 em:w-full sm:full'>
          
             نحن نسعى دائمًا لتسهيل تجربتكم في الوصول إلى خدمات الرعاية الصحية بطريقة مريحة وميسرة.
          </p>
         
            </div>
          </div>
          <div className='w-1/2 em:w-full sm:w-full'>
          <div className='flex  flex-col items-start justify-center px-10'>
          <form className='w-full'>
            <input placeholder=' اكتب اسم الدكتور/المركز/ المستشفى هنا...' name='' className='w-full p-3 rounded-md focus:outline-none' />
            <div className='grid grid-cols-2 my-3 gap-2 em:grid-cols-1'>
              <select className='w-full p-3 rounded-md focus:outline-none text-gray-400'>
                <option defaultValue>المدينة</option>
                <option>12</option>
                <option>12</option>
              </select>
              <select className='w-full p-3 rounded-md focus:outline-none text-gray-400'>
                <option disabled>التخصص</option>
                <option>12</option>
                <option>12</option>
              </select>
            </div>
            <button className='bg-main w-full  px-3 py-3 text-white rounded-md flex items-center gap-x-2 justify-center '> <span>تصفح</span> <TbArrowNarrowLeft className=' items-center' /></button>
          </form>
          </div>
          </div>
        </div>
    </div>



{/* ads doctor */}
{adsDoctor && adsDoctor.length  > 0 ? <> 
  <div className='container mx-auto mt-10'>
      <h4 className='mb-7 text-md font-semibold text-main-400'>الاطباء المميزين</h4>

      <div className='grid grid-cols-4 gap-5 '>
      {adsDoctor.map((item)=>(
        <Link to={`/doctor/${item._id}`} key={item._id} >
      <div className='h-fit bg-white  rounded-lg text-center p-5'>
       <img src={doct1} alt={item.username}  className='w-full rounded-lg'/>
       <h4 className='py-3 text-gray-700'> {item.username}</h4>
        </div>
      </Link>
      ))}
    </div>
    </div>
</> : null }

{/* doctor  */}

  <Doctor />
  </>
    
}
