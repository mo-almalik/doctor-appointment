import React from "react";
import { useError } from "../Context/error.js";

export default function ErrorPage({ message }) {
  const { resetError } = useError();
  return (
    <>
      <div className="flex justify-around w-full bg-red-300 text-white p-2 rounded-md">
        <div>
          <h3>هنالك خطأ</h3>
          <p>{message}</p>
          <button onClick={resetError}>إعادة المحاولة</button>
        </div>

        <button>اتصل بالدعم</button>
      </div>
    </>
  );
}
