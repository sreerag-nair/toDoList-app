import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, Row } from 'antd';
import { Link , Redirect } from 'react-router-dom';
import SpinnerClass from './SpinnerClass';
import axios from 'axios';
const FormItem = Form.Item;


class SignInComponent extends React.Component {        //WORKING


  // componentDidMount(){}

  state = {
    spinnerVar: false,
    
  };

  //error handling
  handleSubmit = (e) => {
    this.setState({ spinnerVar: true })
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:8001',
          values,{
            headers : {
              // 'Authorization' : "Bearer "+ localStorage.getItem('jwtToken')
              'Authorization' : "Bearer "+ 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbFNpZ25JbiI6ImFuYWtpbiIsInBhc3N3b3JkU2lnbkluIjoiYWJjIiwianRpIjoiZDFkMDBmYzItN2ZjNC00NzZlLTkxMWQtNGNmNzYxMTdjOGQ5IiwiaWF0IjoxNTI2NzU5NjIzLCJleHAiOjE1MjY3NjMyMjN9.A1K3k8D-3rdrlvV7b8V2T_wHz-TAqiLwYidxTMBbI7I'
            }
          })
          .then((result) => {

            if(!localStorage.jwtToken){
              //save it in localStorage
            localStorage.setItem('jwtToken', JSON.stringify(result.data));
            console.log("Saved in localStorage");
            console.log('jwtToken : ', localStorage.getItem('jwtToken'));
            this.setState({ spinnerVar: false })
            }
            else{
              console.log("IN ELSE")
            }

          })
        // console.log('Received values of form: ', values);
      }
    });
  }

  render() {

    let mo = null;

    if (this.state.spinnerVar) {
      mo = <SpinnerClass />
    }

    const getFieldDecorator = this.props.getFieldDecorator

    return (
      <Form onSubmit={this.handleSubmit} className="login-form" >

        {/* USERNAME INPUT FIELD */}
        <FormItem>
          {getFieldDecorator('emailSignIn', {
            rules: [{ required: true, message: 'Required!' }],
          })(
            <Input placeholder="Email id" />
          )}
        </FormItem>


        <FormItem>
          {getFieldDecorator('passwordSignIn', {
            rules: [{ required: true, message: 'Password is required' }]
          })(
            <Input placeholder="Password" type="password" />
          )}
        </FormItem>

        <FormItem>
          <div>
            <Row gutter={{ md: 3 }}>
              <Col span={12}>
                <p><Button type="primary" htmlType="submit" size={this.props.size} style={{ width: '100%' }} >Log in</Button></p>
              </Col>
              <Col span={12}>
                <p><Link to={'/git-login'}><Button type="primary" size={this.props.size} style={{ width: '100%', backgroundColor: 'black' }}><Icon type="github" />GitHub</Button></Link></p>
              </Col>
            </Row>
          </div>
        </FormItem>

        <FormItem>
          <div>
            {mo}
          </div>
        </FormItem>

      </Form>
    )
  }
}


export default SignInComponent;



//****************************************************************/
//SINGLETON DESIGN PATTERN
let instance = new SignInComponent()
export function getSingleInstance() {
  return instance
}
  //****************************************************************/