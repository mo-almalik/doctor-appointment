import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { FcWorkflow } from "react-icons/fc";
export default function Navbar() {
  const menu = [
    {path:"/" , title :'الرئيسية'},
    {path:"/" , title :'الخدمات'},
    {path:"/aboutus" , title :'من نحن'},
    {path:"/doctorList" , title :' الدكاترة'},
    {path:"/contact" , title :'اتصل بنا'},
 
  ]
  return <>
    <div className='  py-4'>
      <div className='container m-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center font-bold text-main'> <img src={logo} alt='logo' className='ml-2 w-10' /> عافية</div>
          <div className='flex em:hidden sm:hidden '>
            {menu.map((link ,index) => <>
              <Link to={link.path} >
            
              <li key={index} className={`flex justify-center items-center mx-2 p-3 ${index === 0 && ' text-main'} hover:text-main duration-200`}>
                {link.title}
               </li>
         
               
                
              </Link>
            </>)}
          </div>
          <div>
            <button className='w-28 h-10 em:w-20 em:text-sm bg-mainlight rounded-md text-main hover:text-mainlight hover:bg-main hover:duration-300 duration-300'>حجز الأن</button>
          </div>
          
        </div>
      </div>
    </div>
    
  </>
}
