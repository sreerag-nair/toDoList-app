import React from 'react';
import { Button, Col, Form, Icon, Input, message, Row } from 'antd';
import { Link } from 'react-router-dom';
import SpinnerClass from './SpinnerClass';
import axios from 'axios';
const FormItem = Form.Item;


class SignInComponent extends React.Component {        //WORKING
  
  
  componentWillMount(){
    axios.post('http://localhost:8001',{}, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
    }
  }
).then((response) =>{
  if(response.status === 200 ){
  this.setState({ redirectVar : true })
  }
})
}

state = {
  spinnerVar: false,
  redirectVar : false,
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
        
        // if (!localStorage.JWT_TOKEN) {

        if(result.status === 200){
        //save it in localStorage
        localStorage.setItem('JWT_TOKEN', (result.data.token));
        console.log("Saved in localStorage ");
        this.setState({ spinnerVar: false, redirectVar : true });
        message.success("Welcome back...!!")
        }
        
      })
      .catch((err) =>{
        if(err.response.status === 404){
          this.setState({ spinnerVar: false });
          message.error("Email id or password error..... try again")
        }
      })
    }
  });
}

displayRedirect(){
  if(this.state.redirectVar){
    // return <Redirect to = '/dashboard' />
    this.props.history.push('/dashboard')
  }
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
      rules: [{ type : 'email', required: true, message: 'Invalid email-id format!' }],
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
    {/* <FormItem> */}
    {this.displayRedirect()}
    {/* </FormItem> */}
    
    </Form>
  )
}
}


export default SignInComponent;



//****************************************************************/
//SINGLETON DESIGN PATTERN
// let instance = new SignInComponent()
// export function getSingleInstance() {
//   return instance
// }
//****************************************************************/