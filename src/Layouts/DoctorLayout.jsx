import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import SideBar from "../components/common/SideBar.jsx";
import { TbArrowBadgeRight } from "react-icons/tb";

export default function DoctorLayout() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="absolute z-50 right-[12%] em:right-[70%]">
        <button
          className={` mx-10 cursor-pointer  bg-main w-7 h-7 flex justify-center items-center rounded-md text-white    ${
            !open && "rotate-180"
          }  `}
          onClick={() => setOpen(!open)}
        >
          <TbArrowBadgeRight className="text-white" />
        </button>
      </div>

      <div className="flex w-full h-screen  bg-light">
        <SideBar
          className={`${
            open
              ? "w-[17%] duration-300  bg-white   h-screen overflow-y-auto scrollbar-thumb-mainlight  scrollbar-track-gray-100 scrollbar-thin relative em:absolute em:z-10 em:opacity-100 em:duration-200 em:w-[80%] "
              : " w-0 duration-300 hidden transition"
          } `}
        />
        

        <div className="flex flex-col  w-full h-screen overflow-y-auto scrollbar-thin">
          <div className="container mx-auto">
            <div className="">
              <Header />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
