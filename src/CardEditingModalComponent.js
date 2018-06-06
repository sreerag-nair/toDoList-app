import React, { Component } from 'react';
import { Button, Card, Checkbox, Form, Icon, Input, Popover, Upload } from 'antd';
import axios from 'axios';
import { Col, Row } from 'react-flexbox-grid'

const FormItem = Form.Item;

class CardEditingModalComponent extends Component {

    uploadFile(e) {

        document.getElementById("hiddeninput").click()
        // console.log("HEEEEEEE", e.target.files)

    }

    getFiles(e) {

        var fd = new FormData();
        fd.append('bird', e.target.files[0])

        // console.log(Object.keys(e.target.files))

        console.log('here birs detaisl', fd)

        axios.post('http://localhost:8001/sendFile', fd)
            .then((response) => {

            })

        // console.log("E : ", e.target.files)
    }


    render() {
        return (

            <span>
                <Form>
                    <FormItem>

                        {/* <Upload onChange = { this.uploadFile }> */}
                        <Button type="primary" onClick={this.uploadFile} >
                            <Icon type="upload" />Upload
                    <Input id="hiddeninput" onChange={this.getFiles} type="file" hidden multiple />
                        </Button>
                    </FormItem>
                </Form>
                {/* </Upload> */}


            </span>
        )
    }
}

export default CardEditingModalComponent;