import React, { useEffect ,useState } from 'react'

import { useAuth } from '../../Context/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowBarLeft, TbMarquee2 } from 'react-icons/tb';
import { user } from '../../utils/auth.js';
import { BiAlignJustify, BiBell } from 'react-icons/bi';




export default function Header({toggleSidebar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen); // تغيير حالة الشريط الجانبي عند النقر
    toggleSidebar(!sidebarOpen); // تمرير الحالة الجديدة إلى الشريط الجانبي
  };
 
  const {logout} = useAuth()
  let navigate =  useNavigate();
  const Role = user()
  
  const handleLogout = () => {
    logout();
    if(Role.role === 'doctor'){
      return navigate('/doctor/login')
    }
    if(Role.role === 'admin' || 'user' ){
     return navigate('/login')
    }
   
  };



  const toggleFullscreen = () => {
    const element = document.documentElement;
  
    if (document.fullscreenElement) {
      // إذا كانت الصفحة في وضع التكبير، قم بالخروج منه
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // إذا لم تكن الصفحة في وضع التكبير، قم بتشغيلها
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };
  return (  <>
     <div className='bg-white  border-b border-[#e5e7eb] w-full  top-0'>
      <div className='px-8 flex justify-between items-center h-[60px] leading-[60px]'>
        <div className='flex items-center justify-start gap-x-4 w-[15%]'> 
        <BiAlignJustify className='size-5 text-gray-500 cursor-pointer' onClick={handleSidebarToggle}/>
        <button onClick={()=>toggleFullscreen()} title='تكبير الشاشة'><TbMarquee2 className='text-[23px]' /></button>
        </div>
        <div className='flex justify-between items-center'>
     
          <div >
            {Role.username}
          
          </div>

          <div className=' flex justify-center items-center rounded-md cursor-pointer  '>
           
             <button onClick={()=>handleLogout()} className=' flex items-center  gap-x-2 justify-center    px-5 rounded-md duration-300'>  خروج <TbArrowBarLeft /></button>

          </div>
        </div>

      </div>
    </div>
  </>
    // <div className='py-4 flex justify-between items-center bg-white shadow-md shadow-gray-200  leading-10 w-full px-5 mb-5 rounded-md'>
      
    //   <div className=' flex items-center  gap-x-2 justify-center'>
    //     <button onClick={()=>toggleFullscreen()} title='تكبير الشاشة'><TbMarquee2 className='text-[23px]' /></button>
    //     <button onClick={()=>handleLogout()} className=' flex items-center  gap-x-2 justify-center hover:bg-gray-400 hover:text-white px-5 rounded-md duration-300'>  خروج <TbArrowBarLeft /></button>
    //   </div>

    // </div>
  )
}
