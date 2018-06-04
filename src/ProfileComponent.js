import React, { Component } from 'react';
import { Avatar, Input, Button, message, Tooltip } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';

class ProfileComponent extends Component {

    componentWillMount() {
        axios.post('http://localhost:8001/profileinfo', {},
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            }
        )
            .then((response) => {
                if (response.status === 200) {

                    // console.log("response data : ", response.data)
                    this.setState({
                        userInfoFromDb: response.data,
                        userNameChanged: response.data.userName,
                        nameChanged: response.data.name
                    })
                }
            })
            .catch((err) => {
                // if (err.response.status == 401) {
                console.log("UNAUTHORIZED!!", err)
                this.setState({ redirectVar: true })
                // }
            })

    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {
                this.setState({ showPasswordChangeBoxes: false })
            }
        })
    }


    imgSrc = {
        src: require('./img-src/logo-github.svg.png')
    }

    state = {
        userInfoFromDb: '' || false,
        redirectVar: false,
        showPasswordChangeBoxes: false,
        userNameChanged: '',
        nameChanged: '',
        isUpdatingInProgress: false,
        newPassword: '',
        newPasswordConfirm: '',
        isConfirmPasswordTooltipVisible: false,
        sendData: false
    }


    resetPage() {
        console.log("reset the page")
    }

    showPasswordChangeBoxes(e) {
        return (
            <div>
                <Input style={{ textAlign: "center", marginTop: '10px', }} onChange = { this.setNewPassword.bind(this) }  value={this.state.newPassword} type="password" placeholder="New Password" />
                <Tooltip title = "Passwords donot match... please check" visible={this.state.isConfirmPasswordTooltipVisible}>
                    <Input style={{ textAlign: "center", marginTop: '10px', }} onChange = { this.setNewPasswordConfirm.bind(this) }   value={this.state.newPasswordConfirm} type="password" placeholder="Confirm Password....." />
                </Tooltip>
            </div>
        )

    }

    userNameChanged(e) {

        this.setState({ userNameChanged: e.target.value })

    }

    nameChanged(e) {

        this.setState({ nameChanged: e.target.value })

    }

    updateData() {
        var objToSend = {}

        objToSend["emailId"] = this.state.userInfoFromDb.emailId
        objToSend["userName"] = this.state.userNameChanged
        objToSend["fullName"] = this.state.nameChanged
        objToSend["password"] = this.state.newPassword

        
        axios.post('http://localhost:8001/profileinfo', objToSend,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            }
        )
            .then((response) => {
                if (response.status === 200) {

                    // console.log("response data : ", response.data)
                    // this.setState({
                    //     userInfoFromDb: response.data,
                    //     userNameChanged: response.data.userName,
                    //     nameChanged: response.data.name
                    // })
                    message.success("Data updated successfully :).... redirecting")
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 1000)

                    localStorage.removeItem('JWT_TOKEN')
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    message.error("You haven't logged in, have you ? .... please log in :(")
                    this.props.history.push('/login')
                }
                else if (err.response.status === 400) {
                    message.error("Some error occured.... please try again later :(")
                }
            })
    }

    matchPassword() {
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            this.setState({ sendData: true , isConfirmPasswordTooltipVisible : false })
        }
        else
            {
                this.setState({ isConfirmPasswordTooltipVisible: true })
            }
    }

    setNewPassword(e){
        this.setState({ newPassword : e.target.value },
        () => this.matchPassword())
        
    }

    setNewPasswordConfirm(e){
        this.setState({ newPasswordConfirm : e.target.value },
        () => this.matchPassword())
        
    }

    render() {
        return (
            <Row >
                <Col xs={12}>
                    <Row center="xs" style={{ background: '#818d96' }}>
                        <Col xl={6} style={{ height: '90vh' }}>
                            <div style={{ paddingTop: '100px', }} >


                                <Avatar src={this.imgSrc.src} size="large" shape="circle" style={{ height: '200px', width: '200px' }} />


                                <Input readOnly style={{ textAlign: "center", marginTop: '10px', }} placeholder="EmailId" value={this.state.userInfoFromDb.emailId || ''} />
                                <Input style={{ textAlign: "center", marginTop: '10px', }} onChange={this.userNameChanged.bind(this)} placeholder="User-name" value={this.state.userNameChanged} />
                                <Input style={{ textAlign: "center", marginTop: '10px', }} onChange={this.nameChanged.bind(this)} placeholder="Please enter your name..." value={this.state.nameChanged} />
                                {this.state.showPasswordChangeBoxes

                                    ? this.showPasswordChangeBoxes()

                                    : <Button type="primary" visible="false" onClick={() => this.setState({ showPasswordChangeBoxes: true })} style={{ background: 'black', marginTop: '10px', width: "100%" }}>Change Password</Button>}

                                <Button loading={this.state.isUpdatingInProgress} onClick={this.updateData.bind(this)} type="primary" style={{ background: 'green', marginTop: '10px', width: "50%" }}>Update</Button>
                                <Button type="danger" style={{ width: "50%", marginTop: '10px' }} onClick={this.resetPage} >Cancel</Button>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>

        )
    }
}

export default ProfileComponent;