import React from 'react';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import axios from 'axios'

axios.defaults.baseURL='http://localhost:3001'
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();






