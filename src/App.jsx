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

import {DoctorRouter,UserRouter,AdminRouter} from './utils/ProtectedRouter.js';
import UserAppointmentDetails from './components/user/UserAppointmentDetails.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorLogin from './components/doctor/auth/DoctorLogin.jsx';
import DoctorAppointment from './components/doctor/DoctorAppointment.jsx';
import DoctorAccount from './components/doctor/DoctorAccount.jsx';
import DoctorTimes from './components/doctor/DoctorTimes.jsx';
import DoctorSetting from './components/doctor/DoctorSetting.jsx';
import DoctorPatients from './components/doctor/DoctorPatients.jsx';
import DoctorSuport from './components/doctor/DoctorSuport.jsx';
import DoctorAccounting from './components/doctor/DoctorAccounting.jsx';
import AdminAppointments from './components/admin/AdminAppointments.jsx';
import AdminSettings from './components/admin/AdminSettings.jsx';
import AdminDocrots from './components/admin/AdminDocrots.jsx';
import AdminDoctorDetails from './components/admin/AdminDoctorDetails.jsx';
import AdminUsers from './components/admin/AdminUsers.jsx';
import AdminUserDetails from './components/admin/AdminUserDetails.jsx';
import AdminSuport from './components/admin/AdminSuport.jsx';
import AdminAppointmetDetails from './components/admin/AdminAppointmetDetails.jsx';
import AdminDoctorAds from './components/admin/AdminDoctorAds.jsx';
import AdmainNewDoctors from './components/admin/AdmainNewDoctors.jsx';
import AdminBlocklist from './components/admin/AdminBlocklist.jsx';
import AdminChart from './components/admin/AdminChart.jsx';
import Register from './auth/Register/Register.jsx';
import DoctorRegister from './components/doctor/auth/DoctorRegister.jsx';




let Routers =createBrowserRouter([
  // user routers
  {path:'/',element:<UserLayout /> ,children:[
    {index:true ,element:<UserHome />},
    {path:'about' ,element:<UserAbout />},
    {path:'profile',element:<UserRouter><UserProfile /></UserRouter>},
    {path:'contact' , element: <UserContact />},
    {path:'doctor/login' ,element:<DoctorLogin />},
    {path:'doctor/register' ,element:<DoctorRegister />},
    {path:'doctorList' , element:  <UserDoctorList />},
    {path:'doctor/:id' ,element: <UserDoctorDetails />},
    {path:'all-appointment' ,element:<UserRouter><UserAppointment /></UserRouter>},
    {path:'appointment/:id' ,element:<UserRouter><UserAppointmentDetails /></UserRouter>},

    
  ]},

  // doctor routers
  {path:'/cms',element: <DoctorRouter><DoctorLayout /></DoctorRouter> ,children:[
    {index:true ,element:<DoctorHome />},
    {path:'appointments' ,element:<DoctorAppointment/>},
    {path:'account' ,element:<DoctorAccount/>}, 
    {path:'times' ,element:<DoctorTimes/>},
    {path:'setting' ,element:<DoctorSetting/>},
    {path:'patient' ,element:<DoctorPatients/>},
    {path:'suport' ,element:<DoctorSuport/>},
    {path:'accounting' ,element:<DoctorAccounting/>},
  ]},


  // admin routers
  {path:'/admin',element:<AdminRouter><AdminLayout /></AdminRouter> ,children:[
    {index:true ,element:<AdminHome />},
    {path:'appointments' ,element:<AdminAppointments/>},
    {path:'appointment/id' ,element:<AdminAppointmetDetails/>},
    {path:'settings' ,element:<AdminSettings/>},
    {path:'doctors' ,element:<AdminDocrots/>},
    {path:'doctor/:id' ,element:<AdminDoctorDetails/>},
    {path:'users' ,element:<AdminUsers/>},
    {path:'user/:id' ,element:<AdminUserDetails/>},
    {path:'suport' ,element:<AdminSuport/>},
    {path:'doctor-ads' ,element:<AdminDoctorAds/>},
    {path:'new-doctors' ,element:<AdmainNewDoctors/>},
    {path:'Blocklist' ,element:<AdminBlocklist/>},
    {path:'chart' ,element:<AdminChart/>},
   

  ]},

  // public page 
  {path:'login' ,element:<Login/>},
  {path:'register' ,element:<Register/>},
  // not found page
  {path:"*",element:<NotFound />},
])
function App() {



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
className={'text-sm'}

        />
  </>
}

export default App;
