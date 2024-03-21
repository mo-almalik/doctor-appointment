import React, { useEffect } from 'react'

import { useAuth } from '../../Context/auth.js';
import { useNavigate } from 'react-router-dom';
import { TbArrowBarLeft, TbMarquee2 } from 'react-icons/tb';
import { user } from '../../utils/auth.js';




export default function Header() {
 
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
  return (
    <div className='py-4 flex justify-between items-center bg-white shadow-md shadow-gray-200  leading-10 w-full px-5 mb-5 rounded-md'>
      
      <div className=' flex items-center  gap-x-2 justify-center'>
        <button onClick={()=>toggleFullscreen()} title='تكبير الشاشة'><TbMarquee2 className='text-[23px]' /></button>
        <button onClick={()=>handleLogout()} className=' flex items-center  gap-x-2 justify-center hover:bg-gray-400 hover:text-white px-5 rounded-md duration-300'>  خروج <TbArrowBarLeft /></button>
      </div>

    </div>
  )
}
