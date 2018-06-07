import React, { Component } from 'react';
import { message, Button, Card, Checkbox, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid';
import axios from 'axios';


class AddNoteAttachmentsComponent extends Component {


    componentWillMount() {

    }

    state = {

        fileUploadList: []

    }

    uploadFile(e) {

        document.getElementById("hiddeninput").click()
        // console.log("HEEEEEEE", e.target.files)

    }

    getFiles(e) {

        var imagesToSend = new FormData();

        let x = [];
        for (var i in e.target.files) {
            if (!isNaN(i)) {
                imagesToSend.append('images', e.target.files[i])
                x.push(e.target.files[i])
            }
        }

        // console.log('here birs detaisl', imagesToSend.values())
        // console.log('here birs detais2', x)

        this.setState({ fileUploadList: x })


        axios.post('http://localhost:8001/sendFile', imagesToSend)
            .then((response) => {

            })

        // console.log("E : ", e.target.files)
    }

    render() {

        return (

            <span>
                {
                    this.state.fileUploadList.map((singleUploadedContent, idx) => {
                        return (
                            <Row style = {{ marginBottom: '10px' }} key={idx}>
                                <Col xs={4} sm={2} md={2} lg={2}>
                                    <div style = {{ background : 'white' , height: '55px' , border : '1px black solid' }}>
                                        <img style = {{ height : '100%', width : '100%' }} src = { require(`/home/trainee11/Desktop/todolist-app/src/img-src/${ singleUploadedContent.name }`) } alt = "I" />
                                    </div>
                                </Col>
                                <Col xs={18} sm={9} md={9} lg={9}>
                                    <div style = {{ background : 'azure' , height: '55px' , }}>
                                    {singleUploadedContent.name}
                                    </div>
                                </Col>

                                <Col xs={2} sm={1} md={1} lg={1}>
                                    <div style = {{  height: '55px' , }}><Button shape = "circle" size = "default" type = "danger">
                                    <Icon type="close" />
                                    </Button></div>
                                </Col>
                            </Row>
                                )
                            })
                        }
                                {
                                    < Row style={{ marginBottom: '20px' }} onClick={(e) => {
                                        // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                                        // console.log("getInputBox -- target : ", e.target.childNodes)
                                    }} >
                                        <Col xs={24} sm={12} md={12} lg={12}>
                                            <Button style={{ width: '100%' }} type="primary" onClick={this.uploadFile} >
                                                <Icon type="upload" />Upload
                                    <input id="hiddeninput" onChange={this.getFiles.bind(this)} accept=".jpg, .png, .jpeg" type="file" hidden multiple />
                                            </Button>
                                        </Col>
                                    </Row>
                                }

                                
            </span>

                        )
                    }
}

                export default AddNoteAttachmentsComponent;
                
                
                /*
                
<Row key={idx} style={{ marginBottom: '20px', }} onClick={(e) => {
                    // console.log("current Target : ", e.currentTarget)
                    // console.log("target : ", e.target)
                }} >
                    <Col xs={22} sm={11} md={11} lg={11}><Checkbox checked={entry.isChecked} style={{ textAlign: 'left' }} onChange={this.onCBChecked.bind(this, idx)}> {entry.content} </Checkbox> </Col>
                    <Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this, idx)} shape="circle"><Icon type='close' /></Button></Col>
                </Row>

                */