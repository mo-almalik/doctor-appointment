import React from 'react'
import { Link, redirect } from 'react-router-dom'
import logo from '../../logo.svg'
import { isAuthenticated,  user} from '../../utils/auth.js';
import { useAuth } from '../../Context/auth.js';
export default function Navbar() {
  
  const {logout} = useAuth()
  const menu = [
    {path:"/" , title :'الرئيسية'},
    {path:"/" , title :'الخدمات'},
    {path:"/aboutus" , title :'من نحن'},
    {path:"/doctorList" , title :' الدكاترة'},
    {path:"/contact" , title :'اتصل بنا'},
    {path:"/doctor/login" , title :'انضم كطبيب  '},
  ]
  function Logout(){
    logout();
    
 
   return redirect('/login')
}
const User = user()
  return <>
    <div className='  py-4'>
      <div className='container m-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center font-bold text-main w-[10%]'> <img src={logo} alt='logo' className='ml-2 w-10' /> عافية</div>
          
          {isAuthenticated() && User.role === 'user' ? <>
            <div className='flex justify-center  w-[80%] mx-auto gap-x-5 text-gray-500'>
              <Link to={'/'}>الرئيسية</Link>
              <Link to={'/all-appointment'}>حجوزاتي</Link>
              <Link to={'/doctorList'}>الأطباء</Link>
              <Link to={'/about'}>عن عافية</Link>
              <Link to={'/contact'}>اتصل بنا </Link>
             
            </div>
            <Link to={'/profile'} className='mx-4'>حسابي</Link>
            <Link onClick={()=>Logout()}>خروج</Link>
          </> 
          :<>
          <div className='flex em:hidden sm:hidden '>
            {menu.map((link ,index) => <Link to={link.path} key={index} >
              <li  className={`flex justify-center items-center mx-2 p-3 ${index === 0 && ' text-main'} hover:text-main duration-200`}>
                {link.title}
               </li>  
              </Link>
            )}
          </div>
          <div>
            <button className='w-28 h-10 em:w-20 em:text-sm bg-mainlight rounded-md text-main hover:text-mainlight hover:bg-main hover:duration-300 duration-300'>حجز الأن</button>
          </div>
          </>}
          
          
        </div>
      </div>
    </div>
    
  </>
}
