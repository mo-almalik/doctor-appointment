import React from 'react'
import { TbBaselineDensityMedium } from "react-icons/tb";
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'

export default function Navbar() {
  return <>
    <nav className='bg-slate-100'>
      <div className="container flex  max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex md:flex-1 mx-auto">
          <Link to="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className='flex justify-center sm:hidden '> 
          <Link to={'/'} className='mx-3 text-gray-500 '>home</Link>
          <Link to={'/'} className='mx-3 text-gray-500 '>home</Link>
          <Link to={'/'} className='mx-3 text-gray-500 '>home</Link>
          <Link to={'/'} className='mx-3 text-gray-500 '>home</Link>
          <Link to={'/'} className='mx-3 text-gray-500 '>home</Link>
        </div>
        <div className="flex lg:hidden md:hidden 2xl:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"

          >
            <span className="sr-only">Open main menu</span>
            <TbBaselineDensityMedium />

          </button>
        </div>
      </div>
    </nav>
  </>
}
