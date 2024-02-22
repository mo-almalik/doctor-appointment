import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/auth.js';

import { DoctorProvider } from './Context/doctor.js';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
<AuthProvider>
<DoctorProvider>

<App />

</DoctorProvider>
</AuthProvider>

</>
);


