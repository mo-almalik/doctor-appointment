import React from "react";
import { Helmet } from "react-helmet";

import logo from "../../logo.svg";

import { isAuthenticated, userRole } from "../../utils/auth.js";
import DoctorSlider from "./DoctorSlider.jsx";
import AdminSlider from "./AdminSlider.jsx";

export default function SideBar(props) {
  return (
    <>
      <Helmet>
        <title>لوحة التحكم</title>
      </Helmet>

      <div className={props.className + " px-5"}>
        <div className="flex justify-start items-center py-3 ">
          <img src={logo} alt="logo" className="size-8"/>
          <h5 className="mx-3">عافية </h5>
        </div>
        {isAuthenticated() && userRole() === 'admin' ? <>
          <AdminSlider />
        </> : <><DoctorSlider/></>}
      </div>
    </>
  );
}
