import React, { Component } from 'react';
import { Avatar, Input, Button } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ProfileComponent extends Component {

    componentWillMount(){
        axios.post('http://localhost:8001/profileinfo',{},
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        }
    )
    .then((response) =>{
        if(response.status = 200){

            console.log("response data : ", response.data)
            this.setState({ userInfoFromDb : response.data })
        }
    })
    .catch((err) =>{
        if(err.response.status == 401){
            console.log("UNAUTHORIZED!!")
            this.setState({ redirectVar : true })
        }
    })

}

componentDidMount(){
    document.addEventListener("keydown", (e) =>{

    if(e.key == "Escape"){
        this.setState({ showPasswordChangeBoxes : false })
    }
    })
}


    imgSrc = {
        src : require('./logo-github.svg.png')
    }

    state = {
        emailReadOnly : "Perhaps this works...",
        userInfoFromDb : '' || false,
        redirectVar : false,
        showPasswordChangeBoxes : false
    }

    displayRedirect(){
        if(this.state.redirectVar){
          return <Redirect to = '/' />
        }
      }

      showPasswordChangeBoxes(e){
          return(
              <div>
            <Input style = {{ textAlign : "center", marginTop : '10px' , }} type = "password" placeholder = "New Password" />
            <Input style = {{ textAlign : "center", marginTop : '10px' , }} type = "password" placeholder = "Confirm Password....." />
            </div>
        )
        
    }



    render() {
        return (
            <Row >
                <Col xs={12}>
                    <Row center="xs" style = {{  background: '#0091FA' }}>
                        <Col xl={6} style = {{  height : '90vh' }}>
                        <div style = {{ paddingTop : '100px' , }} >
                            <Avatar src = { this.imgSrc.src } size = "large" shape = "circle" style = {{ height : '200px', width : '200px' }}/>
                            <Input readOnly style = {{ textAlign : "center", marginTop : '10px' , }} placeholder = "EmailId" value = { this.state.userInfoFromDb.emailId || ''  }/>
                            <Input style = {{ textAlign : "center", marginTop : '10px' , }} placeholder = "User-name" value = { this.state.userInfoFromDb.userName || '' }/>
                            <Input style = {{ textAlign : "center", marginTop : '10px' , }} placeholder = "Please enter your name..."  value = { this.state.userInfoFromDb.name }/>
                            { this.state.showPasswordChangeBoxes 
                            
                                ? this.showPasswordChangeBoxes() 
                                
                                : <Button type = "primary" visible = "false" onClick = { () => this.setState({ showPasswordChangeBoxes : true }) } style = {{ background : 'black', marginTop : '10px', width : "100%" }}>Change Password</Button>  }
                            
                            <Button type = "primary" style = {{ background : 'green', marginTop : '10px', width : "50%" }}>Update</Button>
                            <Button style = {{ width : "50%", marginTop : '10px' }}>Cancel</Button>  
                        </div>
                        { this.displayRedirect() }
                        </Col>
                    </Row>
                    
                </Col>
            </Row>

        )
    }
}

export default ProfileComponent;