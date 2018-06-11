import React, { Component } from 'react';
import { Button, Card, Checkbox, Icon, Input, message, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';
import NoteEditingModal from './NoteEditingModal';

class NoteEditingModalContents extends Component {

    state = {
        title: this.props.title,
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        newValueToAdd: '',
        showDivider: true,
        entriesToDelete: [],
    }


    componentWillReceiveProps(nextProps) {

        console.log("props : ", this.props.notesCollectionObject)
        this.setState({ notesCollectionObject: nextProps.notesCollectionObject })
        var tempNoteArray = tempNoteArray = this.state.notesCollectionObject.slice();;

        if (nextProps.shouldChildContentSort) {

            
            tempNoteArray.sort(function (a, b) {
                return a.isChecked - b.isChecked
            })

            this.setState({ notesCollectionObject: tempNoteArray })
            // console.log("temp : ", tempNoteArray)

        }
        else{

            //not implmented properly yet.....
            var randomArray = []

            for(var i = tempNoteArray.length; i > 0; i--){
                console.log(" : : : ", Math.floor(Math.random() * (tempNoteArray.length)))
            }
        }


    }

    componentWillMount() {
        this.setState({ notesCollectionObject: this.props.notesCollectionObject })


        // axios.get('http://localhost:8001/getcurrentnote/' + this.props._id,

        // {
        //     headers: {
        //         "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
        //     }
        // })
        // .then((response) => {
        //     console.log("resbod : ", response.data)

        //     this.setState({ notesCollectionObject: response.data })
        // })
    }


    updateEntryValue(clicked_checkbox_index, e) {
        // console.log("e : ", e.target)
        // console.log("index : ", index)
        var temp = this.state.notesCollectionObject.slice();
        temp[clicked_checkbox_index].content = e.target.value //!this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        this.setState({ notesCollectionObject: temp })

    }

    textBoxValueChanged(e) {
        // console.log("Added! e : ", e.target.value)
        if ((e.target.value.length === 0) && (!this.state.isTooltipVisible)) {
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
        else {
            // console.log("HERE HERE : ", this.state.newValueToAdd);
            this.setState({
                notesCollectionObject: [...this.state.notesCollectionObject, { content: this.state.newValueToAdd, isChecked: false }],
                newValueToAdd: ''
            },
                () => {
                    this.props.populateNotesCollectionObject(this.state.notesCollectionObject)
                })

        }
    }


    generateInputBox() {
        return (

            <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                // console.log("getInputBox -- target : ", e.target.childNodes)
            }} >
                <Col xs={22} sm={11} md={11} lg={11}><Tooltip visible={this.state.isTooltipVisible} title="Input is required to add to the list" > <Input value={this.state.newValueToAdd} onChange={this.textBoxValueChanged.bind(this)} /> </Tooltip></Col>
                <Col xs={2} sm={1} md={1} lg={1}><Button shape="circle" onClick={this.addNewNoteEntry.bind(this)} ><Icon type="plus" /></Button></Col>
            </Row>
        )

    }

    onCBChecked(clicked_checkbox_index, event) {

        var temp = this.state.notesCollectionObject.slice();
        temp[clicked_checkbox_index].isChecked = !this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        this.setState({ noteContent: temp },
            () => {
                this.props.populateNotesCollectionObject(this.state.notesCollectionObject)
            })
    }

    editNoteEntry(index, e) {
        console.log("INDEX  : ", index)

    }

    toDeleteEntry(index, event) {

        var tempArray = this.state.notesCollectionObject.slice()

        // this.setState({
        //     entriesToDelete: [...this.state.entriesToDelete, tempArray.find(function (x, idx) {
        //         if ((idx === index) && (x._id != null)) {
        //             // console.log("idx : ", idx)
        //             // console.log("x : ", x);
        //             return x
        //         }

        //     })],
        //     notesCollectionObject: tempArray.filter((element, idx) => {
        //         // if(idx !== index){
        //             return idx !== index
        //         // }
        //     })
        // }, () => {

        //     this.props.populateEntriesToDelete(this.state.entriesToDelete.slice())
        //     this.props.populateNotesCollectionObject(this.state.notesCollectionObject.slice())
        // })

        var s = [...this.state.entriesToDelete, tempArray.find(function (x, idx) {
            if ((idx === index) && (x._id != null)) {
                // console.log("idx : ", idx)
                // console.log("x : ", x);
                return x
            }

        })];

        var t = tempArray.filter((element, idx) => {
            // if(idx !== index){
            return idx !== index
            // }
        })

        // console.log(s)
        // console.log(t)


        this.props.populateEntriesToDelete(s)
        this.props.populateNotesCollectionObject(t)


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
                                    <Popover trigger="click" content={<span><Input value={entry.content} onChange={this.updateEntryValue.bind(this, idx)} /></span>}>
                                        <Button shape="circle" onClick={this.editNoteEntry.bind(this, idx)} ><Icon type="edit" /></Button>
                                    </Popover>
                                </Col><Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this, idx)} shape="circle"><Icon type='close' /></Button></Col>
                            </Row>
                        )
                    })
                }


                {/*  input box - only 1 to be present at a time */}
                {this.generateInputBox()}


            </div >

            // </Col>
            // <Col xs></Col>
            // </Row>

            // </div>
        )
    }
}

export default NoteEditingModalContents;