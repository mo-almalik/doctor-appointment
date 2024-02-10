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
import UserAppointmentDetails from './components/user/UserAppointmentDetails.jsx';



let Routers =createBrowserRouter([
  // user routers
  {path:'',element:<UserLayout /> ,children:[
    {index:true ,element:<UserHome />},
    {path:'about' ,element:<UserAbout />},
    {path:'profile',element:<UserProfile />},
    {path:'contact' , element: <UserContact />},
    {path:'doctorList' , element:  <UserDoctorList />},
    {path:'doctor/:id' ,element:<UserDoctorDetails />},
    {path:'all-appointment' ,element:<UserAppointment />},
    {path:'new-appointment' ,element:<UserAddAppointment />},
    {path:'appointment:id' ,element:<UserAppointmentDetails />},
    
  ]},

  // doctor routers
  {path:'/doctor',element: <DoctorLayout /> ,children:[
    {index:true ,element:<DoctorHome />}
  ]},


  // admin routers
  {path:'/admin',element:<AdminLayout /> ,children:[
    {index:true ,element:<AdminHome />}
  ]},

  // public page 
  {path:'login' ,element:<Login/>},
  // not found page
  {path:"*",element:<NotFound />},
])
function App() {

  return<>
   
    <RouterProvider router={Routers}></RouterProvider>
  </>
}

export default App;
