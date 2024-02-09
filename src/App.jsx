import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserLayout from './Layouts/UserLayout.jsx';
import UserHome from './components/user/UserHome.jsx';
import DoctorLayout from './Layouts/DoctorLayout.jsx';
import DoctorHome from './components/doctor/DoctorHome.jsx';
import AdminHome from './components/admin/AdminHome.jsx';
import AdminLayout from './Layouts/AdminLayout.jsx';
import NotFound from './components/common/NotFound.jsx';
import Login from './auth/Login/Login.jsx';



let Routers =createBrowserRouter([
  // user routers
  {path:'',element:<UserLayout /> ,children:[
    {index:true ,element:<UserHome />},
    
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
