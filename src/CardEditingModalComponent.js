import React, { Component } from 'react';
import { Button, Card, Checkbox, Form, Icon, Input, Popover, Upload } from 'antd';
import axios from 'axios';
import { Col, Row } from 'react-flexbox-grid'
import { isNumber } from 'util';

const FormItem = Form.Item;

class CardEditingModalComponent extends Component {

    uploadFile(e) {

        document.getElementById("hiddeninput").click()
        // console.log("HEEEEEEE", e.target.files)

    }

    getFiles(e) {

        var imagesToSend = new FormData();
        // imagesToSend.append('bird', e.target.files[0])

        for(var i in e.target.files){
            if(!isNaN(i)){
                imagesToSend.append('bird',e.target.files[i])
            }
        }

        console.log('here birs detaisl', imagesToSend)

        axios.post('http://localhost:8001/sendFile', imagesToSend)
            .then((response) => {

            })

        // console.log("E : ", e.target.files)
    }


    render() {
        return (

            <span>
                {/* <Form>
                    <FormItem> */}

                {/* <Upload onChange = { this.uploadFile }> */}
                <Button type="primary" onClick={this.uploadFile} >
                    <Icon type="upload" />Upload
                    <Input id="hiddeninput" onChange={this.getFiles} type="file" hidden multiple />
                </Button>
                {/* </Upload> */}
                {/* </FormItem>
                </Form> */}


            </span>
        )
    }
}

export default CardEditingModalComponent;