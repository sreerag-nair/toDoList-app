import React, { Component } from 'react';
import './App.css';
import { Button, Card, Divider, Form, Tabs } from 'antd';
// import GitHubComponent from './GitHubComponent';
import { Switch, Route, Link } from 'react-router-dom';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';


const ButtonGroup = Button.Group;
// THE LOGIN PAGE


class LoginForm extends Component {

  // changeProfilePicToDefault = () =>{
  //   this.setState({ img : 'https://www.vectorlogo.zone/logos/w3_svg/w3_svg-icon.svg' });
  // }

  // changeProfilePicToGitCat = () => {
  //   this.setState({ img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/500px-Octicons-mark-github.svg.png' });
  // }

  setToken = (message, token) =>{
    this.setState({ 
      JWTtoken : {
        message : message,
        token : token
      }
     });

     console.log("CURRENT STATE : ", this.state)

  }


  state = {
    size : 'default',
    img :  require('./logo.svg') ,
    JWTtoken : {
        message : null,
        token : null
    }
  }

  

  render() {
    const { getFieldDecorator } = this.props.form; 
    const size = this.state.size;
    
    return (

      // <Router>
      <div>
         <Card hoverable = {'true'}
      style = {{ width : 300 , display : 'table', textAlign : 'center', margin : '0 auto', paddingTop : '200' }}
      // actions = { this.state.goBackBttn }
      cover={<center><img alt="example" src = {this.state.img} style = {{marginTop : 30, height : 50, width : 50}}/></center>}
      >


      <Divider>
      <ButtonGroup>
      <Button type="primary">
        <Link to = {'/'}>Log in</Link>
      </Button>
      <Button type="primary">
       <Link to = {'/new-user'}> Sign up</Link>
      </Button>
    </ButtonGroup>
      </Divider>
      
      <Switch>
        {/* THE SIGN IN ROUTE */}
        <Route exact path='/' render={() => <SignInComponent size = {this.state.size} form = {this.props.form}
          getFieldDecorator = {getFieldDecorator}  setToken = { this.setToken } />}  />
        
        {/* THE SIGN UP ROUTE */}
        <Route exact path='/new-user' render={() => <SignUpComponent form = {this.props.form}  size = {this.state.size}
         getFieldDecorator = {getFieldDecorator} />} />


        {/* <Route exact path = '/git-login' render = { () => <GitHubComponent changeProfilePicToGitCat = { this.changeProfilePicToGitCat } /> }/> */}
      </Switch>

     
      </Card>

      </div>
      // </Router>
    );
  }
}

export default Form.create()(LoginForm);
