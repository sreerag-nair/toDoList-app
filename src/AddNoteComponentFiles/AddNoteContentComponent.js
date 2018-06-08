import React, { Component } from 'react';
import { message, Button, Card, Checkbox, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

// const CheckboxGroup = Checkbox.Group;

class AddNoteContentComponent extends Component {


    componentWillMount() {

        axios.post('http://localhost:8001/shouldRedirect', {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
    }

    componentWillMount(){
        this.setState({ notesCollectionObject : this.props.notesCollectionObjectToSend })
    }

    // componentWillUnmount(){
    //     this.props.sendNotesCollectionObjectToParent(this.state.notesCollectionObject)
    // }



    state = {
        title: "Click here to enter title",
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        newValueToAdd: '',
        isAddButtonDisabled: true,
        isSubmitButtonDisabled: true,
        disableAddButton: false

    }

    

    // {isChecked : , value : },

    textBoxValueChanged(e) {
        if ((e.target.value.length === 0) && (!this.state.isTooltipVisible)) {
            this.setState({ isTooltipVisible: true, isAddButtonDisabled: true })
            return
        }
        //SOME PROBLEM HERE
        else if (e.target.value.length >= 0) {
            this.setState({ newValueToAdd: e.target.value, isTooltipVisible: false, isAddButtonDisabled: false },
            () =>{
                this.props.sendNotesCollectionObjectToParent(this.state.notesCollectionObject)
            })
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
            this.setState({
                notesCollectionObject: [...this.state.notesCollectionObject, { content: this.state.newValueToAdd, isChecked: false }],
                newValueToAdd: '', isSubmitButtonDisabled: false
            }, () =>{
                this.props.sendNotesCollectionObjectToParent(this.state.notesCollectionObject)
                console.log("state : ", this.state.notesCollectionObject)
            })
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

        this.props.sendNotesCollectionObjectToParent(this.state.notesCollectionObject)

    }


    toDeleteEntry(index, event) {
        // console.log("i : ", index)

        this.setState({
            notesCollectionObject: this.state.notesCollectionObject.filter((element, idx) => {
                return idx !== index
            })
        }, () => {
            this.props.sendNotesCollectionObjectToParent(this.state.notesCollectionObject)
            if (!this.state.notesCollectionObject.length)
                this.setState({ isSubmitButtonDisabled: true })
        })

        

    }



    onCancel() {
        if (this.state.notesCollectionObject.length === 0) {
            this.props.history.push('/dashboard')
        }
        else {
            this.setState({ notesCollectionObject: [], newValueToAdd: '', isSubmitButtonDisabled: true })
        }
    }

    render() {
        return (
            // <div style={{ height: '90vh' }}>
            //     <Row>
            //         <Col xs></Col>
            //         <Col xs> <Card hoverable
            //             title={<Popover trigger="click" content={<Input onChange={this.changeTitle.bind(this)} value={this.state.title} placeholder="Title input..." />} >
            //                 <div> {this.state.title} </div> </Popover>}
            //             style={{ textAlign: 'left', background: 'white', marginTop: '150px' }}>

            <span>

                {
                    this.state.notesCollectionObject.map((entry, idx) => {
                        return (
                            <Row key={idx} style={{ marginBottom: '20px', }} onClick={(e) => {
                                // console.log("current Target : ", e.currentTarget)
                                // console.log("target : ", e.target)
                            }} >
                                <Col xs={22} sm={11} md={11} lg={11}><Checkbox checked = { entry.isChecked } style={{ textAlign: 'left' }} onChange={ this.onCBChecked.bind(this,idx)}> {entry.content} </Checkbox> </Col>
                                <Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this,idx)} shape="circle"><Icon type='close' /></Button></Col>
                            </Row>
                        )
                    })
                }

                {/*  input box - only 1 at a time */}
                {this.generateInputBox()}


            </span>

            //         </Card> </Col>
            //         <Col xs></Col>
            //     </Row>

            // </div>
        )
    }
}

export default AddNoteContentComponent;