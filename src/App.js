import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Avatar, Button, Checkbox, Col, Card, Divider, Form, Icon, Input, Layout, Row, Tabs } from 'antd';

//check this import
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
// THE LOGIN PAGE

class SignInComponent extends React.Component{        //WORKING
  render(){
    const getFieldDecorator = this.props.getFieldDecorator
    return(
      <Form onSubmit = {this.handleSubmit} className = "login-form">

              {/* USERNAME INPUT FIELD */}
              <FormItem>
                {getFieldDecorator('userNameSignIn',{
                  rules : [{required : true, message : 'Required!'}],
                })(
                  <Input placeholder = "User Name"/>            
                )}
              </FormItem>


              <FormItem>
                {getFieldDecorator('passwordSignIn',{
                  rules : [{required : true, message : 'Password is required'}]
                })(
                  <Input placeholder = "Password" type = "password"/>
              )}
              </FormItem>
              
              <FormItem>
              <div>
                 <Row gutter = {{md : 3}}>
                   <Col span={12}><p><Button type="primary" htmlType="submit" size={this.props.size} style = {{ width : '100%' }} >Log in</Button></p></Col>
                   <Col span={12}><p><Button type="primary" size={this.props.size} style = {{ width : '100%', backgroundColor : 'black'}}><Icon type="github" />GitHub</Button></p></Col>
                 </Row>
             </div>
              </FormItem>


            </Form>
    )
  }
}


class SignUpComponent extends React.Component{        //WORKING

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    console.log("progress : " + form.getFieldValue('passwordSignUp'));
    if(value && value !== form.getFieldValue('passwordSignUp')){
      // console.log("Matched!")
      callback('Passwords donot match!');
    }
    else{
      callback();
    }
  }

  state = {
    confirmDirty : false
  }

    handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render(){
    const getFieldDecorator = this.props.getFieldDecorator;
    return(
      <Form onSubmit = {this.handleSubmit} className = "login-form">
            
            <FormItem>
              {getFieldDecorator('email',{
                rules : [{required : true, message : 'Email is required'},
              {type : 'email', message : 'Invalid email'}],
              })(
                <Input placeholder = "Email address" type = "email" />
              )
              }
            </FormItem>

            <FormItem>
                {getFieldDecorator('userNameSignUp',{
                  rules : [{required : true, message : 'Required!'}],
                })(
                  <Input placeholder = "User Name"/>            
                )}
              </FormItem>
            
              <FormItem>
          {getFieldDecorator('passwordSignUp', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, 
            { validator: this.validateToNextPassword,}
          ],
          })(
            <Input type="password" placeholder = "Password"/>
          )}
        </FormItem>
        
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }
            , {
              validator: this.compareToFirstPassword,
            }
          ],
          })(
            <Input type="password" placeholder = "Confirm Password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

          <FormItem>
              <div>
                 <Row gutter = {{md : 3}}>
                   <Col span={12}><p><Button type="primary" htmlType = "submit" size={this.props.size} style = {{ width : '100%' }} >Sign up</Button></p></Col>
                   <Col span={12}><p><Button type="primary" size={this.props.size} style = {{ width : '100%', backgroundColor : 'black'}}><Icon type="github" />GitHub</Button></p></Col>
                 </Row>
             </div>
              </FormItem>    

            </Form>
    )
  }
}


class LoginForm extends Component {
  
  //error handling
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  state = {
    size : 'default'
  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    const size = this.state.size;

    return (

      // <Router>
      <div>
         <Card
      style = {{ width : 300 , display : 'table', textAlign : 'center', margin : '0 auto', paddingTop : '200' }}
      // title = "card Title"
      cover={<center><img alt="example" src="https://www.vectorlogo.zone/logos/w3_svg/w3_svg-icon.svg" style = {{marginTop : 30, height : 50, width : 50}}/></center>}
      // https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_xyz.svg
      >

      {/* <SignInComponent size = {this.state.size} getFieldDecorator = {getFieldDecorator} /> */}
      {/* <SignUpComponent form = {this.props.form} size = {this.state.size} getFieldDecorator = {getFieldDecorator} /> */}

      

      <Divider>
      <ButtonGroup>
      <Button type="primary">
        <Link to = {'/'}>Log in</Link>
      </Button>
      <Button type="primary">
       <Link to = {'/new'}> Sign up</Link>
      </Button>
    </ButtonGroup>
      </Divider>
      
      <Switch>
        <Route exact path='/' render={() => <SignInComponent size = {this.state.size} getFieldDecorator = {getFieldDecorator} />} />
        <Route exact path='/new' render={() => <SignUpComponent form = {this.props.form} size = {this.state.size} getFieldDecorator = {getFieldDecorator} />} />
      </Switch>

     
      </Card>

      </div>
      // </Router>
    );
  }
}

export default Form.create()(LoginForm);
