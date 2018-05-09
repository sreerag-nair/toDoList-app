import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, Row } from 'antd';

import SpinnerClass from './SpinnerClass';
import axios from 'axios';
const FormItem = Form.Item;


class SignUpComponent extends React.Component{        //WORKING

  // componentDidMount(){}

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

  export default SignUpComponent;