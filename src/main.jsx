import React from 'react';

import { createRoot } from 'react-dom/client'; // ✅ Import this
import { BrowserRouter } from 'react-router-dom'; // ✅ Correct import

import { AuthProvider } from './authContext.jsx';
import ProjectRoutes from './Route.jsx';


const root = createRoot(document.getElementById('root'));

root.render(
 
    <AuthProvider>
      <BrowserRouter>
        <ProjectRoutes />
      </BrowserRouter>
    </AuthProvider>
 
);
