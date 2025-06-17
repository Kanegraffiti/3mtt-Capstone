import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
