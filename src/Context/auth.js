
import { createContext, useContext, useState } from 'react';
import { getToken } from '../utils/auth.js';

const AuthContext = createContext();

export function AuthProvider(props) {
    const token = getToken()
    
    const [auth,setAuth] = useState(token)


const logout = ()=>{
    setAuth(localStorage.removeItem('authToken'))
}
  return <AuthContext.Provider value={{ auth ,logout}}>
       {props.children}
    </AuthContext.Provider>
 
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
