import React from 'react'
import DoctorAnalytics from './DoctorAnalytics.jsx'
import DoctorWelcome from './DoctorWelcome.jsx'
import DoctorAppointment from './DoctorAppointment.jsx'
export default function DoctorHome() {

  return <>
 <div>
  <DoctorWelcome />
 </div>
<div>
 <DoctorAnalytics />
</div>
<div>
  <DoctorAppointment />
</div>
  </>
}
