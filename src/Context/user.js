
import { createContext, useContext, useState } from 'react';
import api from '../services/api.js';


const UserContext = createContext();

export function UserProvider(props) {


  return <UserContext.Provider value={{}}>
       {props.children}
    </UserContext.Provider>
 
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
