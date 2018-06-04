import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';

// APP ENTRY POINT

ReactDOM.render(
    
        <Router>
            <AppComponent />
            {/* <AddNoteComponent /> */}
            {/* <CardEditingModalComponent /> */}
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();
