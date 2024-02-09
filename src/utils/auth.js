
// حفظ التوكن ودور المستخدم في localStorage
export const saveAuthData = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
  };
  
  // استرجاع التوكن من localStorage
  export const getToken = () => {
     return localStorage.getItem('authToken');
  };
  
  // استرجاع دور المستخدم من localStorage
  export const getUserRole = () => {
    return localStorage.getItem('userRole');
  };
  
  // حذف التوكن ودور المستخدم من localStorage
  export const removeAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };
  
  // التحقق من وجود التوكن
  export const isAuthenticated = () => {
    const token = getToken();
    return token !== null && token !== undefined;
  };
  