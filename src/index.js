import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import { Provider } from 'react-redux';
import store from './state';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
     <App />
     </Provider>
    
 );