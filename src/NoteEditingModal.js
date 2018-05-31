import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

const CheckboxGroup = Checkbox.Group;

class NoteEditingModal extends Component {

    state = {
        title: this.props.noteObj.title || "Click here to add title",
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        newValueToAdd: '',
        isLoading: true,
        showDivider: true
    }


    componentWillMount() {
        // console.log("ON SUBMIT : ", this.props.noteObj._id)

        axios.get('http://localhost:8001/getcurrentnote/' + this.props.noteObj._id,

            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            })
            .then((response) => {
                console.log("resbod : ", response.data)
                this.setState({ notesCollectionObject: response.data, isLoading: false })
            })
    }

    updateEntryValue(clicked_checkbox_index, e){
        // console.log("e : ", e.target)
        // console.log("index : ", index)
        var temp = this.state.notesCollectionObject.slice();
        temp[clicked_checkbox_index].content = e.target.value //!this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        this.setState({ notesCollectionObject: temp })

    }

    //editing the existing note
    submitNote() {
        console.log("ON SUBMIT : ", this.state.notesCollectionObject)

        // axios.post('http://localhost:8001/update/ + 'this.statethis.props.noteObj._id',
        //     this.props.noteObj._id,
        //     {
        //         headers: {
        //             "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
        //         }
        //     })

        axios({
            method : 'PUT',
            url : 'http://localhost:8001/update/'+ this.props.noteObj._id,
            data : this.state.notesCollectionObject ,
            headers :{
                Authorization : "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })

    }


    textBoxValueChanged(e) {
        // console.log("Added! e : ", e.target.value)
        if ((e.target.value.length == 0) && (!this.state.isTooltipVisible)) {
            this.setState({ isTooltipVisible: true })
            return
        }
        else if (e.target.value.length > 0) {
            // console.log("VALUE : ", this.state.newValueToAdd)
            this.setState({ newValueToAdd: e.target.value, isTooltipVisible: false })
        }


    }

    addNewNoteEntry(e) {

        //when the button is clicked with an empty text box
        if (this.state.isTooltipVisible)
            return
        else if (!this.state.isTooltipVisible && !this.state.newValueToAdd) {
            return
        }
        else{
            // console.log("HERE HERE : ", this.state.newValueToAdd);
            this.setState({ notesCollectionObject: [...this.state.notesCollectionObject, { content: this.state.newValueToAdd, isChecked: false }] })
            
        }
    }


    generateInputBox() {
            return (

                <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                    // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                    // console.log("getInputBox -- target : ", e.target.childNodes)
                }} >
                    <Col xs={22} sm={11} md={11} lg={11}><Tooltip visible={this.state.isTooltipVisible} title="Input is required to add to the list" > <Input onChange={this.textBoxValueChanged.bind(this)} /> </Tooltip></Col>
                    <Col xs={2} sm={1} md={1} lg={1}><Button shape="circle" onClick={this.addNewNoteEntry.bind(this)} ><Icon type="plus" /></Button></Col>
                </Row>
            )

    }

    onCBChecked(clicked_checkbox_index, event) {

        console.log("TRIGGERED.....")
        var temp = this.state.notesCollectionObject.slice();
        temp[clicked_checkbox_index].isChecked = !this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        this.setState({ noteContent: temp })
    }

    editNoteEntry(index, e) {
        console.log("INDEX  : ", index)

    }

    toDeleteEntry(index, event) {
        // console.log("i : ", event)
        this.setState({
            notesCollectionObject: this.state.notesCollectionObject.filter((element, idx) => {
                return idx != index
            })
        })
    }


    changeTitle(e){
        this.setState({ title : e.target.value })
    }

    render() {
        return (

            // <div style = {{ height : '90vh' }}>
            // <Row>
            // <Col xs></Col>
            // <Col xs> 


            // <span id = "IDOFDIV" onClick={ this.displayPopoverToChangeTitle.bind(this) }> {this.state.title} </span>

            <Card loading={this.state.isLoading} hoverable title={ <Popover trigger = "click" content = { <Input onChange = { this.changeTitle.bind(this) } value = { this.state.title } placeholder = "Title input..."/> } >
             <div> {this.state.title} </div> </Popover> } style={{ textAlign: 'left', background: 'white',/* marginTop: '150px'*/ }}>

                {

                    this.state.notesCollectionObject.map((entry, idx) => {
                        return (
                            <Row key={idx} style={{ marginBottom: '20px', }}>
                                {/* style = {{ textDecorationLine: 'line-through' }} */}
                                <Col xs={20} sm={10} md={10} lg={10}><Checkbox style={{ textAlign: 'left' }} checked={entry.isChecked} onChange={this.onCBChecked.bind(this, idx)} >
                                    <span style={{ textDecorationLine: entry.isChecked ? 'line-through' : 'none' }} >
                                        {entry.content}
                                    </span>
                                </Checkbox> </Col>
                                <Col xs={2} sm={1} md={1} lg={1}>
                                <Popover trigger = "click" content = { <span><Input value = { entry.content } onChange = { this.updateEntryValue.bind(this,idx) } /></span> }>
                                <Button shape="circle" onClick={this.editNoteEntry.bind(this, idx)} ><Icon type="edit" /></Button>
                                </Popover>
                                </Col><Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this, idx)} shape="circle"><Icon type='close' /></Button></Col>
                            </Row>
                        )
                    })
                }


                {/*  input box - only 1 to be present at a time */}
                {this.generateInputBox()}

                {/* <Button onClick={() => this.setState({ isAddInputBoxVisible: !this.state.isAddInputBoxVisible })} style={{ width: '100%' }} type="primary">ADD</Button> */}
                <Button onClick={this.submitNote.bind(this)} style={{ width: '50%', marginTop: '20px' }} type="primary dashed">Ok/Check</Button>
                <Button style={{ width: '50%', marginTop: '20px' }} type="danger">Cancel</Button>
            </Card>

            // </Col>
            // <Col xs></Col>
            // </Row>

            // </div>
        )
    }
}

export default NoteEditingModal;