import React from 'react'
import { user } from '../../utils/auth.js'

export default function Header() {
  const User = user()
  console.log(User);
  return (
    <div className='py-5 h-14'>
      {User.username}


    </div>
  )
}
