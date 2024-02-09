import React from 'react'
import Navbar from '../components/common/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return <>
    <Navbar />
    <Outlet />
  </>
}
