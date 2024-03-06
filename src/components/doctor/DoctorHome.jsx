import React from 'react'
import DoctorAnalytics from './DoctorAnalytics.jsx'
import DoctorAppointment from './DoctorAppointment.jsx'
import { Helmet } from 'react-helmet'
export default function DoctorHome() {

  return <>
  <Helmet>
    <title>الرئيسية</title>
  </Helmet>

<div>
 <DoctorAnalytics />
</div>
<div>
  <DoctorAppointment />
</div>
  </>
}
