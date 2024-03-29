import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/auth.js';
import { DoctorProvider } from './Context/doctor.js';
import { ErrorProvider } from './Context/error.js';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<ErrorProvider>
<AuthProvider>
<DoctorProvider>

 <App />

</DoctorProvider>
</AuthProvider>
</ErrorProvider>


);


