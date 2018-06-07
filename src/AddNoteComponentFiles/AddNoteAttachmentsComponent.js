import React, { Component } from 'react';
import { message, Button, Card, Checkbox, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'

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

        for (var i in e.target.files) {
            if (!isNaN(i)) {
                imagesToSend.append('images', e.target.files[i])
                this.setState({ fileUploadList : [...this.state.fileUploadList, i] })
            }
        }

        console.log('here birs detaisl', imagesToSend.values())
        console.log('here birs detais2', Object.keys(e.target.files))
        

        // axios.post('http://localhost:8001/sendFile', imagesToSend)
        //     .then((response) => {

        //     })

        // console.log("E : ", e.target.files)
    }

    render() {

        return (

            <span>
                {
                    this.state.fileUploadList.map((singleUploadedContent, idx) => {
                        return (
                            <h1 key = { idx }>UPLOAD no. {idx} </h1>
                        )
                    })



                }
                {
                    < Row style={{ marginBottom: '20px' }} onClick={(e) => {
                        // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                        // console.log("getInputBox -- target : ", e.target.childNodes)
                    }} >
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Button style = {{ width : '100%' }} type="primary" onClick={this.uploadFile} >
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