
import { createContext, useContext, useState } from 'react';
import api from '../services/api.js';


const DoctorContext = createContext();

export function DoctorProvider(props) {
    const [loading ,setLoading] = useState(false)
    const [doctorInfo ,setDoctorInfo] = useState([])
    const [doctors ,setDoctors] = useState([])
    const [doctorMessage ,setDoctorMessage] = useState([])
    // const [currentPage ,setCurrentPage]= useState(1)
    // const[totalPages ,setTotalPages]= useState(1)
    // const [onPageChange ,setOnPageChange]= useState()

 async function UpdateInfo (DoctorData){
  setLoading(true)
     await api.put('/doctor/update-profile',{
      ...DoctorData,
    }).catch((e)=>console.log(e.response.data.message));
    
    
    setTimeout(()=>{
      GetDoctorData()
    },2000)

    setTimeout(()=>{
      setLoading(false) 
    },2000)
    
  

  }

async function GetDoctorData() {
  setLoading(true)
  const {data} = await api.get('/doctor/account').catch((e)=>console.log(e.response.data.message));

    setDoctorInfo(data?.data)
    setDoctorMessage(data?.message)

  setLoading(false)
}

async function GetDoctors() {
  setLoading(true)
  const {data} = await api.get('/doctor/').catch((e)=>console.log(e.response.data.message));
  setDoctors(data?.data)

  setLoading(false)
}


  return <DoctorContext.Provider value={{loading , UpdateInfo ,GetDoctorData ,doctorInfo , GetDoctors,doctors ,doctorMessage }}>
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
