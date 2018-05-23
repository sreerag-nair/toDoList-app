import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, Row } from 'antd';
import { Link, Redirect } from 'react-router-dom';
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
          values, {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
          })
          .then((result) => {

            if (!localStorage.JWT_TOKEN) {

              //save it in localStorage
              localStorage.setItem('JWT_TOKEN', (result.data.token));
              console.log("Saved in localStorage ");
              this.setState({ spinnerVar: false });
              <Redirect to = '/dashboard'/>
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