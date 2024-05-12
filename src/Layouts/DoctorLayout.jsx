import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import SideBar from "../components/common/SideBar.jsx";
import { TbArrowBadgeRight } from "react-icons/tb";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // تغيير حالة الشريط الجانبي عند النقر على الزر في الهيدر
  };

  return (
    <div className="w-full overflow-hidden h-screen">
      <div className="flex overflow-hidden">

        <div className={`sidebar bg-white duration-300 ease-out  ${sidebarOpen ? 'w-[16%] ' : 'w-0'}`}>
          <SideBar />
        </div>

    
        <div className="h-screen bg-light w-full mx-auto overflow-y-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin overflow-x-hidden">
       
          <Header toggleSidebar={toggleSidebar} />

          <div className="container py-3 mx-auto ">
       
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
