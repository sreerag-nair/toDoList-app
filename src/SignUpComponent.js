import React from 'react';
import { Button, Col, Form, Icon, Input, Row } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;


class SignUpComponent extends React.Component {        //WORKING

  componentWillMount() {
    this.setState({ emailValidateStatus: "" })
    axios.post('http://localhost:8001', {}, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
      }
    }
    ).then((response) => {
      if (response.status === 200) {
        console.log("in here")
        this.setState({ redirectVar: true });
      }

    })
      .catch((err) => {
        console.log("err - componentWillMount -- SignUpComppnent : ", err)
      })
  }


  state = {
    confirmDirty: false,
    redirectVar: false,
    emailValidateStatus: '',
    emailHelpMessage: '' || false
  }


  //error handling
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:8001/signup',
          values
        )
          .then((response, err) => {
            if (response.status === 201) { //redirect
              localStorage.setItem('JWT_TOKEN', (response.data.token));
              console.log("Saved in localStorage ");
              this.setState({ redirectVar: true })
            }

            if (response.status === 200) {
              this.setState({ redirectVar: true })
            }

          })
          .catch((err) => {
            console.log(err)
          })
      }
    });
  }


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    console.log("progress : " + form.getFieldValue('passwordSignUp'));
    if (value && value !== form.getFieldValue('passwordSignUp')) {
      callback('Passwords donot match!');
    }
    else {
      callback();
    }
  }

  //check if the email exists in the db
  checkEmailAvailability(e) {
    if (e.target.value.length === 0) {
      this.setState({ emailValidateStatus: '' })
      return
    }
    this.setState({ emailValidateStatus: "validating" })
    axios.post('http://localhost:8001/checkEmailRedundancy', { emailToCheck: e.target.value })
      .then((response) => {
        // console.log("Response data : " , response)
        if (response.status === 200)
          this.setState({ emailValidateStatus: "success" })
      })
      .catch((error) => {
        // console.log("ERROR Body : ", error.response)
        if (error.response.status === 409)
          this.setState({ emailValidateStatus: "error" })
      })

    // }
    //   ,2000)
  }

  displayRedirect() {
    if (this.state.redirectVar) {
      // return <Redirect to = '/dashboard' />
      this.props.history.push('/dashboard')
    }
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




  render() {
    const getFieldDecorator = this.props.getFieldDecorator;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">

        <FormItem hasFeedback={true} validateStatus={this.state.emailValidateStatus} >
          {getFieldDecorator('emailSignUp', {
            rules: [{ required: true, message: 'Email is required', type: 'email' }],
          })(
            <Input onChange={ this.checkEmailAvailability.bind(this) } placeholder="Email address" type="email" />
          )
          }
        </FormItem>

        <FormItem>
          {getFieldDecorator('userNameSignUp', {
            rules: [{ required: true, message: 'Required!' }],
          })(
            <Input placeholder="User Name" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('passwordSignUp', {
            rules: [{
              required: true, message: 'Please input your password!',
            },
            { validator: this.validateToNextPassword, }
            ],
          })(
            <Input type="password" placeholder="Password" />
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
            <Input type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem>
          <div>
            <Row gutter={{ md: 3 }}>
              <Col span={12}><p><Button type="primary" htmlType="submit" size={this.props.size} style={{ width: '100%' }} >Sign up</Button></p></Col>
              <Col span={12}><p>
                <a href = "http://localhost:8001/authenticate">
                <Button type="primary" size={this.props.size} style={{ width: '100%', backgroundColor: 'black' }}><Icon type="github" />GitHub</Button>
                </a>
                </p></Col>
            </Row>
          </div>
        </FormItem>
        {this.displayRedirect()}
      </Form>
    )
  }
}

export default SignUpComponent;