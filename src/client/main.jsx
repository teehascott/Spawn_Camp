import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { HashRouter } from 'react-router-dom';
import {UserProvider} from './context/UserContext'; // Import UserProvider
import "./index.css";

const root = createRoot(document.querySelector('#root'));

root.render(
      <App />
);
