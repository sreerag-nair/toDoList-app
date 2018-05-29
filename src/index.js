import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './App';
import DashBoard from './DashBoard'
import CardComponent from './CardComponent';
import ProfileComponent from './ProfileComponent';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router , Switch, Link, Route} from 'react-router-dom';

// APP ENTRY POINT
import { Button } from 'antd';
import AddNoteComponent from './AddNoteComponent';
import CardEditingModalComponent from './CardEditingModalComponent';

ReactDOM.render(
    
        <Router>
            <AppComponent />
            {/* <AddNoteComponent /> */}
            {/* <CardEditingModalComponent /> */}
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();
