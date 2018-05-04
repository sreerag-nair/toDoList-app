import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Avatar, Button, Checkbox, Col, Card, Form, Icon, Input, Layout, Row, Tabs } from 'antd';


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// THE LOGIN PAGE

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


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    // console.log("progress : " + form.getFieldValue('password'));
    if(value && value !== form.getFieldValue('password')){
      // console.log("Matched!")
      callback('Passwords donot match!');
    }
    else{
      callback();
    }


   /*
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      console.log("password : " + form.getFieldValue())
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
   */
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }


  state = {
    size : 'default'
  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    const size = this.state.size;

    return (  

      <div>
         <Card
      style = {{ width : 300 , display : 'table', textAlign : 'center', margin : '0 auto', paddingTop : '200' }}
      // title = "card Title"
      cover={<center><img alt="example" src="https://www.vectorlogo.zone/logos/w3_svg/w3_svg-icon.svg" style = {{marginTop : 30, height : 50, width : 50}}/></center>}
      // https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_xyz.svg
      >

      {/* TABS START HERE */}
      
      <Tabs>
        {/* THE LOGIN TAB */}
        <TabPane tab = "Login" key = "1">
            <Form onSubmit = {this.handleSubmit} className = "login-form">

              {/* USERNAME INPUT FIELD */}
              <FormItem>
                {getFieldDecorator('userName',{
                  rules : [{required : true, message : 'Required!'}],
                })(
                  <Input placeholder = "User Name"/>            
                )}
              </FormItem>


              <FormItem>
                {getFieldDecorator('password',{
                  rules : [{required : true, message : 'Password is required'}]
                })(
                  <Input placeholder = "Password" type = "password"/>
              )}
              </FormItem>
              
              <FormItem>
              <div>
                 <Row gutter = {{md : 3}}>
                   <Col span={12}><p><Button type="primary" htmlType="submit" size={size} style = {{ width : '100%' }} >Log in</Button></p></Col>
                   <Col span={12}><p><Button type="primary" size={size} style = {{ width : '100%', backgroundColor : 'black'}}><Icon type="github" />GitHub</Button></p></Col>
                 </Row>
             </div>
              </FormItem>


            </Form>
        </TabPane>
        {/* THE LOGIN TAB ENDS */}
        



        {/* THE SIGN UP TAB */}
        <TabPane tab = "Sign up" key = "2">
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
                {getFieldDecorator('userName',{
                  rules : [{required : true, message : 'Required!'}],
                })(
                  <Input placeholder = "User Name"/>            
                )}
              </FormItem>
            
              <FormItem>
          {getFieldDecorator('password', {
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
            <Input type="password" placeholder = "Confirm Password" /*onBlur={this.handleConfirmBlur}*/ />
          )}
        </FormItem>

          <FormItem>
              <div>
                 <Row gutter = {{md : 3}}>
                   <Col span={12}><p><Button type="primary" htmlType = "submit" size={size} style = {{ width : '100%' }} >Sign up</Button></p></Col>
                   <Col span={12}><p><Button type="primary" size={size} style = {{ width : '100%', backgroundColor : 'black'}}><Icon type="github" />GitHub</Button></p></Col>
                 </Row>
             </div>
              </FormItem>    

            </Form>

        </TabPane>
        {/* THE SIGN UP TAB ENDS */}
      </Tabs>
      {/* TABS END HERE */}

      </Card>
      </div>

    );
  }
}

export default Form.create()(LoginForm);

// <p><Input placeholder = "User Name"/></p>
//        <p><Input placeholder = "Password" type = "password"/></p>
       

//        {/* //THE LOGIN AND SERVICE LOGIN BUTTONS */}
//        <p> <div>
//       <Row gutter = {{md : 3}}>
//       <Col span={12}><p><Button type="primary" size={size} style = {{ width : '100%'}} >Log in</Button></p></Col>
//       <Col span={12}><p><Button type="primary submit" size={size} style = {{ width : '100%'}}>GitHub</Button></p>    </Col>
//       </Row>
//     </div>
//     </p>   