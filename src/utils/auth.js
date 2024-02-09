import { jwtDecode } from "jwt-decode";

// حفظ التوكن ودور المستخدم في localStorage
export const saveAuthData = (token) => {
    localStorage.setItem('authToken', token);
  
  };
  
  // استرجاع التوكن من localStorage
  export const getToken = () => {
     return localStorage.getItem('authToken');
  };
  
  export const userRole = ()=>{
    let token = getToken()
    const Token =  token.split(' ')[1]
   const decoded = jwtDecode(Token)
   const userRole = decoded.role 
 return userRole
  }
  
  // حذف التوكن ودور المستخدم من localStorage
  export const removeAuthData = () => {
    localStorage.removeItem('authToken');
  
  };
  
  // التحقق من وجود التوكن
  export const isAuthenticated = () => {
    const token = getToken();
    return token !== null && token !== undefined;
  };
  