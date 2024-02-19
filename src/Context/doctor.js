
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';


const DoctorContext = createContext();

export function DoctorProvider(props) {
    const [loading ,setLoading] = useState(false)
    const [doctorInfo ,setDoctorInfo] = useState([])
  
 async function UpdateInfo (DoctorData){
  setLoading(true)
    const {data} = await api.put('/doctor/update-profile',{
      ...DoctorData,
    }).catch((e)=>console.log(e.response.data.message));
    console.log(data);
    setLoading(false)
  }

async function GetDoctorData() {
  setLoading(true)
  const {data} = await api.get('/doctor/account').catch((e)=>console.log(e.response.data.message));
  console.log(data);
  setDoctorInfo(data?.data)
  setLoading(false)
}

useEffect(()=>{
  GetDoctorData()
},[])

  return <DoctorContext.Provider value={{loading , UpdateInfo ,GetDoctorData ,doctorInfo}}>
       {props.children}
    </DoctorContext.Provider>
 
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
