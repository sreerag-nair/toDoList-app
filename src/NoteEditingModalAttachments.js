import React, { Component } from 'react';
import { Button, Card, Checkbox, Icon, Input, message, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

class NoteEditingModalAttachments extends Component {

    state = {
        // title: this.props.noteObj.title || "Click here to add title",
        // isAddInputBoxVisible: false,
        // isTooltipVisible: false,
        // notesCollectionObject: [],
        // newValueToAdd: '',
        // isLoading: true,
        // showDivider: true,
        // entriesToDelete : [],
        // updateInProgress : false,
        attachmentsCollectionObject: []

    }


    componentWillMount() {

        this.setState({ attachmentsCollectionObject: this.props.attachmentsCollectionObject })

        this.props.attachmentsCollectionObject.map((x,i) =>{
            console.log("x : ", x)
        })

    }

    downloadImage(event) {
        // preventDefault() to the anchor tag from firing the href call i.e the 
        //default behaviour of <a> tags
        event.preventDefault();
        // console.log('e : ', event.target.href)

        axios.get(event.target.href, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
            .then((response) => {
                console.log("response in NoteEditingModalAttachments : ", response)
            })

    }


    render() {
        return (

            // <div style = {{ height : '90vh' }}>
            // <Row>
            // <Col xs></Col>
            // <Col xs> 


            // <span id = "IDOFDIV" onClick={ this.displayPopoverToChangeTitle.bind(this) }> {this.state.title} </span>
            <div>
                {

                    this.state.attachmentsCollectionObject.map((singleContent, idx) => {
                        return (
                            <Row style={{ marginBottom: '10px' }} key={idx}>
                                <Col xs={4} sm={2} md={2} lg={2}>
                                    <div style={{ background: 'white', height: '55px', border: '1px black solid' }}>
                                        <img style={{ height: '100%', width: '100%' }} alt="placeholderForImage" />
                                    </div>
                                </Col>
                                <Col xs={18} sm={9} md={9} lg={9}>
                                    <div style={{ background: 'azure', height: '55px', }}>
                                        <a href={"http://localhost:8001/assets/" + singleContent.savedName}> {singleContent.originalName} </a>
                                    </div>
                                </Col>

                                <Col xs={2} sm={1} md={1} lg={1}>
                                    <div style={{ height: '55px', }}><Button shape="circle" size="default" type="danger">
                                        <Icon type="close" />
                                    </Button></div>
                                </Col>
                            </Row>
                        )
                    })
                }

            </div>


            // </Col>
            // <Col xs></Col>
            // </Row>

            // </div>
        )
    }
}

export default NoteEditingModalAttachments;