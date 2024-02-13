import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './auth/Login/Login.jsx';
import UserLayout from './Layouts/UserLayout.jsx';
import AdminLayout from './Layouts/AdminLayout.jsx';
import UserHome from './components/user/UserHome.jsx';
import DoctorLayout from './Layouts/DoctorLayout.jsx';
import NotFound from './components/common/NotFound.jsx';
import UserAbout from './components/user/UserAbout.jsx';
import AdminHome from './components/admin/AdminHome.jsx';
import UserContact from './components/user/UserContact.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import DoctorHome from './components/doctor/DoctorHome.jsx';
import UserDoctorList from './components/user/UserDoctorList.jsx';
import UserAppointment from './components/user/UserAppointment.jsx';
import UserDoctorDetails from './components/user/UserDoctorDetails.jsx';
import UserAddAppointment from './components/user/UserAddAppointment.jsx';
import {DoctorRouter,UserRouter,AdminRouter} from './utils/ProtectedRouter.js';
import UserAppointmentDetails from './components/user/UserAppointmentDetails.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, userRole } from './utils/auth.js';
import { useEffect } from 'react';


let Routers =createBrowserRouter([
  // user routers
  {path:'',element:<UserLayout /> ,children:[
    {index:true ,element:<UserHome />},
    {path:'about' ,element:<UserAbout />},
    {path:'profile',element:<UserRouter><UserProfile /></UserRouter>},
    {path:'contact' , element: <UserContact />},
    {path:'doctorList' , element:  <UserDoctorList />},
    {path:'doctor/:id' ,element:<UserDoctorDetails />},
    {path:'all-appointment' ,element:<UserRouter><UserAppointment /></UserRouter>},
    // {path:'new-appointment' ,element:<UserAddAppointment />},
    {path:'appointment/:id' ,element:<UserRouter><UserAppointmentDetails /></UserRouter>},
    
  ]},

  // doctor routers
  {path:'/cms',element: <DoctorRouter><DoctorLayout /></DoctorRouter> ,children:[
    {index:true ,element:<DoctorHome />}
  ]},


  // admin routers
  {path:'/admin',element:<AdminRouter><AdminLayout /></AdminRouter> ,children:[
    {index:true ,element:<AdminHome />}
  ]},

  // public page 
  {path:'login' ,element:<Login/>},
  // not found page
  {path:"*",element:<NotFound />},
])
function App() {
useEffect(()=>{
  getToken()

},[])

  return<>
   
    <RouterProvider router={Routers}></RouterProvider>
    <ToastContainer 
      position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

        />
  </>
}

export default App;
