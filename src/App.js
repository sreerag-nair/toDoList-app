import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Avatar, Button, Checkbox, Col, Card, Divider, Form, Icon, Input, Layout, Row, Tabs } from 'antd';
import GitHubComponent from './GitHubComponent';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SpinnerClass from './SpinnerClass';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
// THE LOGIN PAGE

class SignInComponent extends React.Component{        //WORKING

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.changeProfilePicToDefault();
  }

  state = {
    spinnerVar : false
  };

  //error handling
  handleSubmit = (e) => {
    this.setState({ spinnerVar : true })
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("VALUES : " , values);
      if (!err) {
        axios.post('http://localhost:8001', 
          values
         )
        .then((result) => {
          // console.log('SERVER RESPONDED');
          
          this.setState({ spinnerVar : false })
        })
        // console.log('Received values of form: ', values);
      }
    });
  }

  render(){

    let mo = null ;

    if(this.state.spinnerVar){
      mo = <SpinnerClass />
    }

    const getFieldDecorator = this.props.getFieldDecorator
    
    return(
      <Form onSubmit = {this.handleSubmit} className = "login-form" >

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
                   <Col span={12}>
                      <p><Button type="primary" htmlType="submit" size={this.props.size} style = {{ width : '100%' }} >Log in</Button></p>
                   </Col>
                   <Col span={12}>
                      <p><Link to = {'/git-login'}><Button type="primary" size={this.props.size} style = {{ width : '100%', backgroundColor : 'black'}}><Icon type="github" />GitHub</Button></Link></p>
                   </Col>
                 </Row>
             </div>
              </FormItem>
              
              <FormItem>
                <div>
                { mo }
                </div>
              </FormItem>

            </Form>
    )
  }
}


class SignUpComponent extends React.Component{        //WORKING

  //error handling
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:8001/signup', 
          values
         )
        .then((result) => {
          console.log("SIGNUP RESULT : " + result);
        })
        // console.log('Received values of form: ', values);
      }
    });
  }


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    console.log("progress : " + form.getFieldValue('passwordSignUp'));
    if(value && value !== form.getFieldValue('passwordSignUp')){
      callback('Passwords donot match!');
    }
    else{
      callback();
    }
  }
  componentDidMount(){
    this.props.changeProfilePicToDefault();
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
      <Form onSubmit = { this.handleSubmit } className = "login-form">
            
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

  changeProfilePicToDefault = () =>{
    this.setState({ img : 'https://www.vectorlogo.zone/logos/w3_svg/w3_svg-icon.svg' });
  }

  changeProfilePicToGitCat = () => {
    this.setState({ img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/500px-Octicons-mark-github.svg.png' });
  }

  state = {
    size : 'default',
    img :  "https://www.vectorlogo.zone/logos/w3_svg/w3_svg-icon.svg" 
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
      // https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_xyz.svg
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
          getFieldDecorator = {getFieldDecorator} changeProfilePicToDefault = { this.changeProfilePicToDefault } />} />
        
        {/* THE SIGN UP ROUTE */}
        <Route exact path='/new-user' render={() => <SignUpComponent form = {this.props.form}  size = {this.state.size}
         getFieldDecorator = {getFieldDecorator} changeProfilePicToDefault = { this.changeProfilePicToDefault } />} />
        {/* <Route exact path = '/git-login' render = { () => <GitHubComponent changeProfilePicToGitCat = { this.changeProfilePicToGitCat } /> }/> */}
      </Switch>

     
      </Card>

      </div>
      // </Router>
    );
  }
}

export default Form.create()(LoginForm);
