import React from 'react'
import { NavLink } from "react-router-dom";
import {
  TbBrandGoogleAnalytics,
  TbCalendar,
  TbClock,
  TbCreditCard,
  TbHelpCircle,
  TbLayoutGrid,
  TbUser,
  TbUserPlus,
  TbUserStar,
} from "react-icons/tb";
export default function AdminSlider() {
  return <>
     <div className="flex flex-col justify-around my-5 text-sm">
          <div className="">
            <ul className=" flex flex-col items-center text-md">
              <NavLink
                to='/admin'
                className="text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbLayoutGrid className="size-5" /> لوحة التحكم
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
                 
                  <TbCalendar className="size-5" /> الحجوزات
                </span>
              </NavLink>

              <NavLink
                to={"new-doctors"}
                className={({ isActive }) =>
                  isActive
                    ? "my-1  flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbUserPlus className="size-5" /> الطبات الواردة
                </span>
              </NavLink>

              <NavLink
                to={"doctors"}
                className={({ isActive }) =>
                  isActive
                    ? "my-1  flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbUser className="size-5" /> الأطباء
                </span>
              </NavLink>

              <NavLink
                to={"users"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbClock className="size-5" />  المستخدمين
                </span>
              </NavLink>
              <NavLink
                to={"doctor-ads"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  <TbUserStar className="size-5" /> الأطباء المميزين
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
                  
                  <TbCreditCard className="size-5" /> الحسابات
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
                  
                  <TbBrandGoogleAnalytics className="size-5" /> اعلانات
                </span>
              </NavLink>

              <NavLink
                to={"settings"}
                className={({ isActive }) =>
                  isActive
                    ? " my-1.5 flex items-center gap-x-2 bg-main text-white py-2 rounded-md w-full px-5 duration-200 ease"
                    : "text-NavLink my-1.5 flex items-center gap-x-2 hover:bg-main hover:text-white py-2 rounded-md w-full hover:px-5 duration-200 ease"
                }
              >
                <span className="flex items-center gap-x-2">
                  
                  <TbLayoutGrid className="size-5" /> الأعدادات
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
                  
                  <TbHelpCircle className="size-5" /> الدعم الفني
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
  </>
}
