import { jwtDecode } from "jwt-decode";


export const saveAuthData = (token) => {
    localStorage.setItem('authToken', token);
  
  };
  

  export const getToken = () => {
     return localStorage.getItem('authToken');
  };
  
  export const userRole = ()=>{
    let token = getToken()
   if(token !== null && token !== undefined){
    const Token =  token.split(' ')[1] 
   const decoded = jwtDecode(Token)
   const userRole = decoded.role 
 return userRole
   }

  }
  export const user =()=>{
    let token = getToken()
   if(token !== null && token !== undefined){
    const Token =  token.split(' ')[1] 
   const decoded = jwtDecode(Token)
   const user = decoded
 return user
   }
  }
 

  

  export const isAuthenticated = () => {
    const token = getToken();
    return token !== null && token !== undefined;
  };
  