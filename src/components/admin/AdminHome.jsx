import React from 'react'
import AdminAnalytics from './AdminAnalytics.jsx'
import AdminDocrots from './AdminDocrots.jsx'
import AdminUsers from './AdminUsers.jsx'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  return <>
  <Helmet>
          <title>لوحة التحكم</title>
        </Helmet>
    <div>
      <AdminAnalytics />
    </div>
    <div className=' my-6'>
    <div className='flex justify-between items-center'>
    <h3 className='text-gray-600 my-2'>الأطباء</h3>
    <Link to='doctors' className='text-main-400 text-sm '>عرض الكل</Link>
    </div>
      <AdminDocrots />
    </div>
     <div className=''>
     <div className='flex justify-between items-center'>

     <h3 className='text-gray-600 my-2'>المستخدمين</h3>
     <Link to='users' className='text-main-400 text-sm '>عرض الكل</Link>
     </div>
      <AdminUsers />
     </div>
    
  </>
}
