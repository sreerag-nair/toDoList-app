import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import DashBoard from './DashBoard'
import CardComponent from './CardComponent';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(

        <Router>
            <CardComponent message = {"General Kenobi"} />
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();


