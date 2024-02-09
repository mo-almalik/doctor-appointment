import { RouterProvider, createBrowserRouter } from 'react-router-dom';
let Routers =createBrowserRouter([])
function App() {
  return<>
    min app
    <RouterProvider router={Routers}></RouterProvider>
  </>
}

export default App;
