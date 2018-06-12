import React, { Component } from 'react';
import { message, Button, Card, Checkbox, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

import AddNoteContentComponent from './AddNoteComponentFiles/AddNoteContentComponent'
import AddNoteComponentAttachments from './AddNoteComponentFiles/AddNoteAttachmentsComponent'
import AddNoteComponentSharedWith from './AddNoteComponentFiles/AddNoteSharedWithComponent'

// const CheckboxGroup = Checkbox.Group;

class AddNoteComponent extends Component {


    componentWillMount() {

        axios.post('http://localhost:8001/shouldRedirect', {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
    }

    state = {
        title: "Click here to enter title",
        key: 'tab2',
        displaySubmitButtonLoading: false,

        notesCollectionObjectToSend: [],

        //this is used to display the files to upload, not  to send to the server
        fileUploadList: [],
        previewImageList: [],
        imagesToSend: [],

        sharedWith: [],

    }

    getFocusTitleBox(event) {
        if (event.target.value == 'Click here to enter title') {
            this.setState({ title: '' })
        }
    }

    loseFocusTitleBox(event) {
        if (event.target.value == '') {
            this.setState({ title: 'Click here to enter title' })
        }
    }

    submitNote() {

        if (!this.state.notesCollectionObjectToSend.length) {
            console.log("HEREEEEE")
            return;
        }

        var objToSubmit = Object.assign({}, { title: this.state.title },
            { entries: this.state.notesCollectionObjectToSend },
            { sharedWith: this.state.sharedWith })


        console.log("objToSubmit : ", this.state)

        // this.setState({ isAddInputBoxVisible: false, isAddButtonDisabled: true, isSubmitButtonDisabled: true, displaySubmitButtonLoading: true })

        axios.post('http://localhost:8001/addnewnote', objToSubmit,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            })
            .then((response) => {
                // this.setState(this.state);
                var x = response
                console.log("RESBODY : ", response)
                message.success('Note added to database successfully.')
                this.setState({
                    isAddInputBoxVisible: true, disableAddButton: false, isSubmitButtonDisabled: false, displaySubmitButtonLoading: false,
                    notesCollectionObject: [], title: "Click here to enter title"
                })


                //if there is something in fileUploadList 

                if (this.state.fileUploadList.length) {


                    let attachmentsToSend = new FormData()

                    this.state.fileUploadList.map((fileObj, idx) => {
                        attachmentsToSend.append('images', fileObj)
                    })


                    console.log("OHHH SO U HAVE FILES TO SEND : ", attachmentsToSend)
                    axios.post('http://localhost:8001/sendFiles', attachmentsToSend, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN'),
                            "noteID": response.data.noteID
                        }
                    })

                        .then((response) => {
                            console.log("response from sendFile : ")
                        })
                }
            })
            .catch((err) => {
                console.log("ERROR : ", err)
                message.error('There was an error')
            }
            )
    }

    changeTitle(e) {
        this.setState({ title: e.target.value })
    }

    onTabChange = (key, type) => {
        // console.log(key, type);
        this.setState({ [type]: key });
    }

    sendNotesCollectionObjectToParent(noteObj) {
        this.setState({ notesCollectionObjectToSend: noteObj })
    }

    sendAttachmentsCollectionObjectToParent(imageListToDisplay, previewImageList) {
        this.setState({ fileUploadList: imageListToDisplay, previewImageList: previewImageList })
    }

    render() {

        const tabList = [
            {
                key: 'tab1',
                tab: <span><Icon type="bars" />Content</span>,
            },
            {
                key: 'tab2',
                tab: <span><Icon type="paper-clip" />Attachments</span>,
            },
            {
                key: 'tab3',
                tab: <span><Icon type="share-alt" />Shared With...</span>,
            },
        ]

        const contentList = {

            tab1: <AddNoteContentComponent
                sendNotesCollectionObjectToParent={this.sendNotesCollectionObjectToParent.bind(this)}
                notesCollectionObjectToSend={this.state.notesCollectionObjectToSend} />,


            tab2: <AddNoteComponentAttachments
                sendAttachmentsCollectionObjectToParent={this.sendAttachmentsCollectionObjectToParent.bind(this)}
                fileUploadList={this.state.fileUploadList}
                previewImageList={this.state.previewImageList}
            />,


            tab3: <h1>FEATURE UNAVAILABLE...</h1>
        }

        return (
            <div style={{ height: '90vh' }}>
                <Row>
                    <Col xs></Col>
                    <Col xs> <Card hoverable
                        title={<Popover trigger="click" content={<Input onBlur={this.loseFocusTitleBox.bind(this)} onFocus={this.getFocusTitleBox.bind(this)} onChange={this.changeTitle.bind(this)} value={this.state.title} placeholder="Title input..." />} >
                            <div> {this.state.title} </div> </Popover>}
                        style={{ textAlign: 'left', background: 'white', marginTop: '150px' }}
                        tabList={tabList}
                        onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                        activeTabKey={this.state.key}
                    >

                        {contentList[this.state.key]}

                        <Button onClick={this.submitNote.bind(this)} style={{ width: '50%', marginTop: '20px' }} disabled={this.state.isSubmitButtonDisabled} loading={this.state.displaySubmitButtonLoading} type="primary">
                            <Icon type="plus" />
                            Add note
                        </Button>
                        <Button style={{ width: '50%', marginTop: '20px' }} onClick={this.props.onCancel} type="danger">
                            <Icon type="close" />
                            Cancel
                        </Button>
                    </Card> </Col>
                    <Col xs></Col>
                </Row>

            </div>
        )
    }
}

export default AddNoteComponent;