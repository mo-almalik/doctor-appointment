
import { createContext, useContext, useState } from 'react';
import api from '../services/api.js';


const DoctorContext = createContext();

export function DoctorProvider(props) {
    const [loading ,setLoading] = useState(false)

 
  



  return <DoctorContext.Provider value={{loading}}>
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
