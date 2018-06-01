import React, { Component } from 'react';
import { message, Button, Card, Checkbox, Divider, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

const CheckboxGroup = Checkbox.Group;

class AddNoteComponent extends Component {


    componentWillMount() {

        axios.post('http://localhost:8001/shouldRedirect', {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
    }

    state = {
        redirectVar: '',
        title: "Click here to enter title",
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        newValueToAdd: '',
        isAddButtonDisabled: true,
        isSubmitButtonDisabled: true,
        displaySubmitButtonLoading: false,
        disableAddButton: false

    }

    submitNote() {

        var objToSubmit = Object.assign({}, { title: this.state.title }, { entries: this.state.notesCollectionObject })


        // console.log(objToSubmit)

        this.setState({ isAddInputBoxVisible: false, disableAddButton: true, isSubmitButtonDisabled: true, displaySubmitButtonLoading: true })

        axios.post('http://localhost:8001/addnewnote', objToSubmit,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            })
            .then((response) => {
                // this.setState(this.state);
                message.success('Note added to database successfully.')
                this.setState({ isAddInputBoxVisible: true, disableAddButton: false, isSubmitButtonDisabled: false, displaySubmitButtonLoading: false })
            })
            .catch((err) => {
                message.error('There was an error')
            }
            )

    }

    // {isChecked : , value : },

    textBoxValueChanged(e) {
        if ((e.target.value.length == 0) && (!this.state.isTooltipVisible)) {
            this.setState({ isTooltipVisible: true, isAddButtonDisabled: true })
            return
        }
        //SOME PROBLEM HERE
        else if (e.target.value.length >= 0) {
            this.setState({ newValueToAdd: e.target.value, isTooltipVisible: false, isAddButtonDisabled: false })
            return
        }

    }

    addNewNoteEntry(e) {

        //when the button is clicked with an empty text box

        if (this.state.isTooltipVisible)
            return
        else if (!this.state.isTooltipVisible && !this.state.newValueToAdd) {
            return
        }
        else
            this.setState({ notesCollectionObject: [...this.state.notesCollectionObject, { content: this.state.newValueToAdd, isChecked: false }],
                 newValueToAdd: '', isSubmitButtonDisabled : false })
    }


    generateInputBox() {
        // if (this.state.isAddInputBoxVisible)
            return (
                <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                    // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                    // console.log("getInputBox -- target : ", e.target.childNodes)
                }} >
                    <Col xs={22} sm={11} md={11} lg={11}><Tooltip visible={this.state.isTooltipVisible} title="Please enter something here to add it to the list" > <Input onChange={this.textBoxValueChanged.bind(this)} value={this.state.newValueToAdd} /> </Tooltip></Col>
                    <Col xs={2} sm={1} md={1} lg={1}><Button disabled={this.state.isAddButtonDisabled} shape="circle" onClick={this.addNewNoteEntry.bind(this)} ><Icon type="plus" /></Button></Col>
                </Row>
            )

    }

    onCBChecked(clicked_checkbox_index, event) {

        var temp = this.state.notesCollectionObject.slice();

        temp[clicked_checkbox_index].isChecked = !this.state.notesCollectionObject[clicked_checkbox_index].isChecked

        this.setState({ notesCollectionObject: temp })

        // this.setState( { notesCollectionObject[clicked_checkbox_index].isChecked : !this.state.notesCollectionObject[clicked_checkbox_index].isChecked } );

    }


    toDeleteEntry(index, event) {
        // console.log("i : ", index)

        this.setState({
            notesCollectionObject: this.state.notesCollectionObject.filter((element, idx) => {
                return idx != index
            })
        }, () =>{
            if(!this.state.notesCollectionObject.length)
            this.setState({ isSubmitButtonDisabled : true })
        })


    }

    changeTitle(e) {
        this.setState({ title: e.target.value })
    }

    render() {
        return (
            <div style={{ height: '90vh' }}>
                <Row>
                    <Col xs></Col>
                    <Col xs> <Card hoverable 
                    title={ <Popover trigger = "click" content = { <Input onChange = { this.changeTitle.bind(this) } value = { this.state.title } placeholder = "Title input..."/> } >
                    <div> {this.state.title} </div> </Popover> }
                     style={{ textAlign: 'left', background: 'white', marginTop: '150px' }}>

                        {
                            this.state.notesCollectionObject.map((entry, idx) => {
                                return (
                                    <Row key={idx} style={{ marginBottom: '20px', }} onClick={(e) => {
                                        // console.log("current Target : ", e.currentTarget)
                                        // console.log("target : ", e.target)
                                    }} >
                                        <Col xs={22} sm={11} md={11} lg={11}><Checkbox style={{ textAlign: 'left' }} onChange={this.onCBChecked.bind(this, idx)}> {entry.content} </Checkbox> </Col>
                                        <Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this, idx)} shape="circle"><Icon type='close' /></Button></Col>
                                    </Row>
                                )
                            })
                        }

                        {/*  input box - only 1 at a time */}
                        {this.generateInputBox()}

                        {/* <Button onClick={() => this.setState({ isAddInputBoxVisible: !this.state.isAddInputBoxVisible })} disabled={this.state.disableAddButton} style={{ width: '100%' }} type="primary">ADD</Button> */}
                        <Button onClick={this.submitNote.bind(this)} style={{ width: '50%', marginTop: '20px' }} disabled={this.state.isSubmitButtonDisabled} loading={this.state.displaySubmitButtonLoading} type="primary">Add note</Button>
                        <Button style={{ width: '50%', marginTop: '20px' }}  type="danger">Cancel</Button>
                    </Card> </Col>
                    <Col xs></Col>
                </Row>

            </div>
        )
    }
}

export default AddNoteComponent;