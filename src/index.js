import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DashBoard from './DashBoard'
import CardComponent from './CardComponent';
import ProfileComponent from './ProfileComponent';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router , Switch} from 'react-router-dom';


ReactDOM.render(
                
        <Router>
            {/* <DashBoard /> */}
            
                <App />    
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();
