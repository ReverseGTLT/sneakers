import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, HashRouter} from "react-router-dom";
import './assets/normalize.css'
import './assets/index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
        <App />
    </HashRouter>
  </React.StrictMode>
);
