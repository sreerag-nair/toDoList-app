import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DashBoard from './DashBoard'
import CardComponent from './CardComponent';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';

var x = 20;


ReactDOM.render(
                
        <Router>
            {/* <CardComponent dateVar = {new Date().toString()} /> */}
            {/* <DashBoard /> */}
            <App />
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();


