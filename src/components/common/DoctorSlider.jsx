import React from 'react'
import { NavLink } from "react-router-dom";
import {
  TbCalendar,
  TbClock,
  TbCreditCard,
  TbHelpCircle,
  TbLayoutGrid,
  TbUser,
} from "react-icons/tb";
export default function DoctorSlider() {
  return <>
     <div className="flex flex-col justify-around my-5 text-sm">
          <div className="">
            <ul className=" flex flex-col items-center text-md">
              <NavLink
                to='/cms'
                className="text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbLayoutGrid className="size-4" /> لوحة التحكم
                </span>
              </NavLink>

              <NavLink
                to={"appointments"}
                className={({ isActive }) =>
                  isActive
                    ? "my-1  flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1  flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                 
                  <TbCalendar className="size-4" /> الحجوزات
                </span>
              </NavLink>

              <NavLink
                to={"patient"}
                className={({ isActive }) =>
                  isActive
                    ? "my-1  flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbUser className="size-4" /> المرضي
                </span>
              </NavLink>

              <NavLink
                to={"times"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbClock className="size-4" /> الجدول الزمني
                </span>
              </NavLink>

              <NavLink
                to={"accounting"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbCreditCard className="size-4" /> الحسابات
                </span>
              </NavLink>

              <NavLink
                to={"setting"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbLayoutGrid className="size-4" /> الأعدادات
                </span>
              </NavLink>

              <NavLink
                to={"suport"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbHelpCircle className="size-4" /> الدعم الفني
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
  </>
}
