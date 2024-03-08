
import { createContext, useContext, useState } from 'react';
import api from '../services/api.js';


export const DoctorContext = createContext();

export function DoctorProvider(props) {
    const [loading ,setLoading] = useState(false)
    const [doctorInfo ,setDoctorInfo] = useState([])
    const [doctorcount ,setDoctorcount] = useState([])
    const [doctors ,setDoctors] = useState([])
    const [doctorMessage ,setDoctorMessage] = useState([])
    const [adsDoctor,setAdsDoctor] = useState([])
    const [currentPage ,setCurrentPage]= useState(1)
    const[totalPages ,setTotalPages]= useState(1)


    const handlePageChange = (pages) => {
    setCurrentPage(pages);
  };
 async function UpdateInfo (DoctorData){
  setLoading(true)
     await api.put('/doctor/update-profile',{
      ...DoctorData,
    }).catch((e)=>console.log(e.response.data.message));
    
    
    setTimeout(()=>{
      GetDoctorData()
    },1500)

    setTimeout(()=>{
      setLoading(false) 
    },2000)
    
  

  }

async function GetDoctorData() {
  setLoading(true)
  const data = await api.get('/doctor/account').catch((e)=>console.log(e.response.data.message));

    setDoctorInfo(data?.data.data.data)
    setDoctorcount(data?.data?.data.count)
    setDoctorMessage(data?.data.message)

  setLoading(false)
}

async function GetDoctors() {
  setLoading(true)
  const data = await api.get('/doctor/').catch((e)=>console.log(e.response.data.message));
  setDoctors(data?.data.data.docs)

  setLoading(false)
}

async function GetDoctorsAds(pages) {
  setLoading(true)
  const {data} = await api.get(`/doctor/ads?page=${pages}`).catch((e)=>console.log(e.response.data.message));
  setAdsDoctor(data?.data.docs)
  setTotalPages(data?.data.totalPages)
  setLoading(false)
}


  return <DoctorContext.Provider value={{loading , UpdateInfo ,GetDoctorData ,
  doctorInfo , GetDoctors,doctors ,
  doctorMessage ,GetDoctorsAds ,adsDoctor,
  setCurrentPage,handlePageChange,currentPage,
  totalPages,doctorcount
  }}>
       {props.children}
    </DoctorContext.Provider>
 
};
