import React, { Component } from 'react';
import './App.css';
import LoginComponent from './LoginComponent';
import { Route, Switch } from 'react-router-dom';
import DashBoard from './DashBoard';
import ProfileComponent from './ProfileComponent';



class App extends Component {

  // changeProfilePicToDefault = () =>{
  //   this.setState({ img : 'https://www.vectorlogo.zone/logos/w3_svg/w3_svg-icon.svg' });
  // }

  // changeProfilePicToGitCat = () => {
  //   this.setState({ img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/500px-Octicons-mark-github.svg.png' });
  // }

  render() {

    return (

      <div>
        <Switch>
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/" component={LoginComponent} />
        </Switch>
      </div>
    );
  }
}

export default App