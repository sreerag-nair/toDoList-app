

import React, { Component } from 'react';
import { Button, Card, Divider, Form, Tabs } from 'antd';
// import GitHubComponent from './GitHubComponent';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';


// this file is the container that holds 
// card which contains the signin and signup components...

const ButtonGroup = Button.Group;
// THE LOGIN PAGE

class LoginComponent extends Component {
  setToken = (message, token) => {
    this.setState({
      JWTtoken: {
        message: message,
        token: token
      }
    });

    console.log("CURRENT STATE : ", this.state)

  }


  state = {
    size: 'default',
    img: require('./logo.svg')
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const size = this.state.size;
    return (

      <div>
        <Card hoverable={'true'}
          style={{ width: 300, display: 'table', textAlign: 'center', margin: '0 auto', paddingTop: '200' }}
          // actions = { this.state.goBackBttn }
          cover={<center><img alt="example" src={this.state.img} style={{ marginTop: 30, height: 50, width: 50 }} /></center>}
        >


          <Divider>
            <ButtonGroup>
              <Button type="primary">
                <Link to={'/card/login'}>Log in</Link>
              </Button>
              <Button type="primary" onClick={() => alert('Clicked')}>
                <Link to={'/card/new-user'} > Sign up</Link>
              </Button>
            </ButtonGroup>
          </Divider>

          {/* <Switch> */}
          {/* THE SIGN IN ROUTE */}
          <Route exact path='/card/login' render={() => <SignInComponent size={this.state.size} form={this.props.form}
            getFieldDecorator={getFieldDecorator} setToken={this.setToken} />} />

          {/* THE SIGN UP ROUTE */}
          <Route exact path='/card/new-user' render={() => <SignUpComponent form={this.props.form} size={this.state.size}
            getFieldDecorator={getFieldDecorator} />} />


          {/* <Route exact path = '/git-login' render = { () => <GitHubComponent changeProfilePicToGitCat = { this.changeProfilePicToGitCat } /> }/> */}
          {/* </Switch> */}


        </Card>

      </div>

    )
  }
}


export default Form.create()(LoginComponent);