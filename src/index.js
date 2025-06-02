import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import routes from './routes';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';

// Add console log to verify React is initializing
console.log('React initializing with routes:', routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
