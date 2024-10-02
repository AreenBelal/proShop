import React from 'react';
import ReactDOM from 'react-dom/client';
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import './index.css';
import App from './component/App';
import { BrowserRouter } from 'react-router-dom';


import { Provider } from 'react-redux'
import store from './component/Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <BrowserRouter>

    <Provider store={store}>
     <App />
     </Provider>,
    </BrowserRouter>
    
 );
 
