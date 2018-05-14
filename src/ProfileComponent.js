import React, { Component } from 'react';
import { Avatar, Input } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';


class ProfileComponent extends Component {
    imgSrc = {
        src : require('./logo-github.svg.png')
    }
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Row center="xs">
                        <Col xl={6} style = {{ background : 'grey', height : '100vh' }}>
                        <div style = {{ paddingTop : '100px' , }} >
                            <Avatar src = { this.imgSrc.src } size = "large" shape = "circle" style = {{ height : '200px', width : '200px' }}/>
                            <Input style = {{ marginTop : '10px' , }} placeholder = "Username"/>
                            <Input style = {{ marginTop : '10px' , }} placeholder = "Name"/>
                            <Input style = {{ marginTop : '10px' , }} placeholder = "EmailId"/>
                            <Input style = {{ marginTop : '10px' , }} placeholder = "Password" type = "password" />
                        </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        )
    }
}

export default ProfileComponent;