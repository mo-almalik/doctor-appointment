import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/auth.js';
import { DoctorProvider } from './Context/doctor.js';
import { AdminProvider } from './Context/admin.js';
import { ErrorProvider } from './Context/error.js';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
<ErrorProvider>
<AuthProvider>
<DoctorProvider>
<AdminProvider>
 <App />
</AdminProvider>
</DoctorProvider>
</AuthProvider>
</ErrorProvider>
</>
);


