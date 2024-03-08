import React, { useContext, useEffect, useState } from 'react'
import DoctorUpdateAccount from './DoctorUpdateAccount.jsx';
import DoctorAppointmentSetting from './DoctorAppointmentSetting.jsx';
import DoctorPasswordChenge from './DoctorPasswordChenge.jsx';
import { DoctorContext} from '../../Context/doctor.js';


const AccountSection = () => <div><DoctorUpdateAccount/> </div>;
const SettingsSection = () => <div><DoctorAppointmentSetting /> </div>;
const ReviewsSection = () => <div>محتوى التقييمات</div>;
const PasswordChange = () => <div> <DoctorPasswordChenge /> </div>;
export default function DoctorSetting() {
  const {doctorInfo,loading,GetDoctorData} =useContext(DoctorContext);
  const [activeSection, setActiveSection] = useState('التقييمات');
  const sections = {
    'حسابي': AccountSection,
    'اعدادات الحجز': SettingsSection,
   
    'التقييمات': ReviewsSection,
    'تغير كلمة المرور': PasswordChange,
  };
  const handleSectionClick = (section) => {
    setActiveSection(section);

  };
  const ActiveSectionComponent = sections[activeSection];

  useEffect(()=>{
    GetDoctorData()
  },[])
  return <>

  <div className=' flex  items-start gap-4 em:flex-col sm:flex-col w-full'>
  <div className='bg-white h-52 rounded-md  w-[40%] em:w-full sm:w-full'>
    <div className='flex flex-col justify-center items-center mt-8'>
    {loading ? <>

    </> : <>

    </>}
     <h4> د/ <span>{doctorInfo.username}</span></h4>
     <h4>{doctorInfo.specialization}</h4>
     
     
     {/* <h4>{ item.rating ? getStarIcons(item.rating)   : "" } </h4> */}
     <div className='flex justify-between items-center w-full px-5 em:flex-col sm:flex-col em:gap-2'>
      <div className=' text-gray-600'>
       <span>سعر المقابلة :</span>
       
       <span className='mx-5'>{doctorInfo.price}</span>
       </div>
      <div className=' bg-green-400 p-2 rounded-md text-white'>
        <span className='mx-2'>الحالة</span>
        {doctorInfo.status}
      </div>
     </div>
    </div>
  </div>
  <div className='flex flex-col  rounded-md  gap-y-3 w-full '>
     
    <div className='flex justify-around items-center bg-white  p-4 rounded-md em:flex-col  em:space-y-4'>
    {Object.keys(sections).map((section, index) => (
        <button  key={index} onClick={() => handleSectionClick(section)} >
          {section}
        </button>
      ))}
    </div>
      
      <div className=' gap-y-3 w-full bg-white p-4 rounded-md'>
    <h2>  <ActiveSectionComponent /></h2>
    </div>

   </div>
   
  </div>
    
  </>
}
 