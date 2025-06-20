import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './config.js';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import './index.css';

axios.defaults.baseURL = BASE_URL;
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
