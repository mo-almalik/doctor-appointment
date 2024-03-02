import React from 'react'
import AdminAnalytics from './AdminAnalytics.jsx'
import AdminDocrots from './AdminDocrots.jsx'
import AdminUsers from './AdminUsers.jsx'
import { Helmet } from 'react-helmet'

export default function AdminHome() {
  return <>
  <Helmet>
          <title>لوحة التحكم</title>
        </Helmet>
    <div>
      <AdminAnalytics />
    </div>
    <div className=' my-6'>
      <h3 className='text-gray-600 my-2'>الأطباء</h3>
      <AdminDocrots />
    </div>
     <div className=''>
     <h3 className='text-gray-600 my-2'>المستخدمين</h3>
      <AdminUsers />
     </div>
    
  </>
}
