import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Icon, Input, } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

class AddNoteComponent extends Component {


    submitNote() {

        axios.post('http://localhost:8001/addnewnote',       
            noteObj,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            })

    }


    state = {
        title: "Hello There",
        isAddInputBoxVisible: false,
        notesCollectionObject: [
            { isChecked: false, value: 'First' },
            { isChecked: false, value: 'Second' },
            { isChecked: false, value: 'Third' },
            { isChecked: false, value: 'Fourth' },

        ],
        newValueToAdd: ''
    }

    // {isChecked : , value : },

    genElem() {
        // if (this.state.x)
        //     return (<Input style={{ marginBottom: '10px' }}
        //         prefix={<Checkbox style={{ marginRight: '20px' }} />} placeholder="Hello there" />)

        // This line generated boxes as many times as  u click it...
        this.setState({ enteredDataTest: [...this.state.enteredDataTest, { value: 'zDFSsdfg ' }] })
        console.log(this.state)
    }

    tbChanged(e) {
        // console.log("Added! e : ", e.target.value)
        this.setState({ newValueToAdd: e.target.value })
    }

    addNewNoteEntry(e) {
        this.setState({ notesCollectionObject: [...this.state.notesCollectionObject, { isChecked: false, value: this.state.newValueToAdd }] })
        // this.setState({newValueToAdd : ''})
        console.log('---------------------START------------------------')
        console.log('e.currentTarget : ', e.currentTarget)
        console.log('e.target : ', e.target.parentElement)
        console.log('----------------------END-------------------------')
    }


    genInputBox() {
        if (this.state.isAddInputBoxVisible)
            return (
                <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                    console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                    console.log("getInputBox -- target : ", e.target.childNodes)
                }} >
                    <Col xs={22} sm={11} md={11} lg={11}><Input onChange={this.tbChanged.bind(this)} /></Col>
                    <Col xs={2} sm={1} md={1} lg={1}><Button shape="circle" onClick={this.addNewNoteEntry.bind(this)} ><Icon type="plus" /></Button></Col>
                    {/* <Col xs={12} sm={9} md={10} lg={11}><Input size = 'small' /></Col> */}
                    {/* <Col xs={6} sm={3} md={2} lg={1}><Button shape = "circle" size = "small" onClick = { () => alert('clicked') }>+</Button></Col> */}
                </Row>
            )

    }

    onChecked(clicked_checkbox) {
        console.log("clicked : ", clicked_checkbox)

        // var updated = this.state.notesCollectionObject.slice()


    }

    render() {
        return (
            <Card title={<div onClick={() => prompt('title')}>{this.state.title}</div>} style={{ width: '30vw', height: '90vh', background: 'white', }}>

                {
                    this.state.notesCollectionObject.map((entry, idx) => {
                        return (
                            <Row key={idx} style={{ marginBottom: '20px' }} onClick={(e) => {
                                console.log("current Target : ", e.currentTarget)
                                console.log("target : ", e.target)
                            }} >
                                <Col xs={24} sm={12} md={12} lg={12}><Checkbox onChange={this.onChecked}> {entry.value} </Checkbox> </Col>
                                {/* <Col xs={12} sm={9} md={10} lg={11}><Input size = 'small' /></Col> */}
                                {/* <Col xs={6} sm={3} md={2} lg={1}><Button shape = "circle" size = "small" onClick = { () => alert('clicked') }>+</Button></Col> */}
                            </Row>
                        )
                    })
                }

                {/*  input box - only 1 at a time */}
                {this.genInputBox()}

                <Button onClick={() => this.setState({ isAddInputBoxVisible: true })} style={{ width: '100%' }} type="primary">ADD</Button>
            </Card>
        )
    }
}

export default AddNoteComponent;