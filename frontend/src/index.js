import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from "./reportWebVitals";
import 'react-toastify/ReactToastify.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Updated initialization

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
