import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './api.js';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import { motion } from 'framer-motion';
import './index.css';

axios.defaults.baseURL = BASE_URL;
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <App />
      </motion.div>
    </BrowserRouter>
  </React.StrictMode>
);
