import React, { useEffect, useState } from "react";
import { TbClockPause, TbLoader, TbPlayerPause, TbPlayerPauseFilled, TbPlus, TbTrash } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../services/api.js";
import { toast } from "react-toastify";
export default function DoctorTimes() {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState([]);
  const [updateTime ,setUpdateTime] = useState(time)
  const [error ,setError] = useState(null)


  let Timevli = {
    day: "",
    startTime: "",
    endTime: "",
  };
  let validationSchema = Yup.object({
    day: Yup.string().required(" اليوم مطلوب "),
    startTime: Yup.string().required(" زمن البدء مطلوب"),
    endTime: Yup.string().required("زمن الانتهاء مطلوب"),
  });

  async function getTimes() {
    setLoading(true);
    const response = await api
      .get("/time/my-time")
      .catch((error) => console.log(error.response.data.message));
    setTime(response?.data?.data);
   
    setLoading(false);
  }

  async function AddTime(TimeData) {
    setLoading(true);
    const {data} = await api
      .post("/time/add", TimeData)
      .catch((error) => {
        setError(error.response.data.message)
        toast.error(error.response.data.message)
        setUpdateTime(time)
      });
    
    setUpdateTime(data?.data)
    setLoading(false);
    
    if(data.success === true){
      toast.success(data.message)
    }
   
  }

  async function StopTime(Tid){
    setLoading(true);
    const {data} = await api
      .put(`/time/mange-time/${Tid}`)
    
      .catch((error) => {
        setError(error.response.data.message)
        toast.error(error.response.data.message)
        
      });
    

    setLoading(false);
     
    if(data.success === true){
      toast.success(data.message)
      getTimes()
    }

  }
  async function DeleteTime(id){
    setLoading(true);
    const {data} = await api
      .delete(`/time/delete-time/${id}`,)
    
      .catch((error) => {
        setError(error.response.data.message)
        toast.error(error.response.data.message)
        
      });
    

    setLoading(false);
     
    if(data.success === true){
      toast.success(data.message)
      getTimes()
    }

  }

  let formik = useFormik({
    initialValues: Timevli,
    validationSchema,
    onSubmit: AddTime,
  });

  useEffect(() => {
    getTimes();
  }, [updateTime]);

  
  const days = {
    Monday: 'الإثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت',
    Sunday: 'الأحد',
  };
  

  return (
    <>
      <div className=" w-full grid grid-cols-2 em:grid-cols-1 sm:grid-cols-1 gap-5">
        <div className="bg-white p-5 rounded-md h-fit">
          <h4 className="mb-5">اضافة زمن</h4>
          {error ? <>
          <span className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
          {error}
          </span>
          </> : ""}
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="text-gray-500" htmlFor="day">اليوم</label>
              <select 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="day"
                value={formik.values.day}
               className="bg-gray-300 my-2 h-12 p-2 w-full rounded-md focus:outline-none">
                <option value={'Saturday'}>السبت</option>
                <option value={'Sunday'}>الأحد</option>
                <option value={'Monday'}>الإثنين</option>
                <option value={'Tuesday'}>الثلاثاء</option>
                <option value={'Wednesday'}>الأربعاء</option>
                <option value={'Thursday'}>الخميس</option>
                <option value={'Friday'}>الجمعة</option>
              </select>
              
              {formik.errors.day && formik.touched.day ? (
                <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
                  {formik.errors.day}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="text-gray-500" htmlFor="startTime">زمن البدء</label>
              <input
                type="time"
                placeholder="زمن البدء"
                name="startTime"
                className="bg-gray-300 my-2 h-12 p-2 w-full rounded-md focus:outline-none"
                onChange={formik.handleChange}
              />
              {formik.errors.startTime && formik.touched.startTime ? (
                <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
                  {formik.errors.startTime}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="text-gray-500" htmlFor="endTime">زمن الانتهاء</label>
              <input
                type="time"
                placeholder="زمن الانتهاء"
                name="endTime"
                className="bg-gray-300 my-2 h-12 p-2 w-full rounded-md focus:outline-none"
                onChange={formik.handleChange}
              />
              {formik.errors.endTime && formik.touched.endTime ? (
                <div className="text-red-500 text-sm py-1 rounded-md my-2 px-2">
                  {formik.errors.endTime}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              className="bg-main text-white w-full flex justify-center items-center gap-x-4 py-3 rounded-md"
              type="submit"
            >
              <TbPlus /> اضف
            </button>
          </form>
        </div>

        <div className="bg-white p-5 rounded-md h-fit">
          <h4> اوقات العمل </h4>
          <div className="flex flex-col justify-center gap-4 w-full mt-5">
            {loading ? (
              <>
                <TbLoader className="animate-spin" />
              </>
            ) : (
              <>
                {time ? (
                  <>
                    {time.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 bg-opacity-60 rounded-md px-5"
                      >
                        <div className="my-5 flex justify-between em:flex-col sm:flex-col em:text-center sm:text-center gap-3">
                          <div>{days[item.day]} </div>
                          <div className="flex justify-center gap-2 em:flex-col sm:flex-col">
                            
                            <span className="bg-green-300 bg-opacity-50 p-1 rounded-md ">
                              
                              <span className="mx-2 text-sm">
                                زمن البدء
                              </span> - {item.startTime}
                            </span>
                            <span className="bg-gray-300 bg-opacity-50 p-1 rounded-md ">
                              
                              <span className="mx-2 text-sm">
                                زمن الانتهاء
                              </span>
                              - {item.endTime}
                            </span>
                          </div>
                          <div className="flex justify-center items-center gap-x-2">
                            <button onClick={()=>StopTime(item._id)}
                             className={`${item.isAvailable ? 'text-gray-400' : 'text-green-400'}`} title={`${item.isAvailable ? 'ايقاف' : 'تشغيل'}`}><TbClockPause   /></button>
                            <button onClick={()=>DeleteTime(item._id)} className="text-red-400"><TbTrash /></button>
                          </div>
                        </div>
                      </div>
                      
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
