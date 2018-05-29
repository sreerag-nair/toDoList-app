import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Icon, Input, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

const CheckboxGroup = Checkbox.Group;

class NoteEditingModal extends Component {
    
    
    componentDidMount(){
        // console.log("ON SUBMIT : ", this.props.noteObj._id)
        
        axios.get('http://localhost:8001/getcurrentnote/' + this.props.noteObj._id,
        
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
        .then((response) =>{
            console.log("resbod : ", response.data)
            var cList = [], uList = []
            response.data.filter( (noteObj) =>{
                noteObj.isChecked ? cList.push(noteObj) : uList.push(noteObj) 
            } )
            this.setState({unCheckedTasks : uList, checkedTasks : cList, isLoading : false})
        })
    }
    
    
    
    //editing the existing note
    submitNote() {
        // console.log("ON SUBMIT : ", this.state.notesCollectionObject)
        
        axios.post('http://localhost:8001/getcurrentnote',
        this.props.noteObj._id,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
        
        
    }
    
    
    state = {
        title: this.props.noteObj.title || "Click here to add title",
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        newValueToAdd: '',
        isLoading : true,
        showDivider : true,
        checkedTasks : [],
        unCheckedTasks : []
    }
    
    // {isChecked : , value : },
    
    textBoxValueChanged(e) {
        // console.log("Added! e : ", e.target.value)
        if ((e.target.value.length == 0) && (!this.state.isTooltipVisible)) {
            this.setState({ isTooltipVisible: true })
            return
        }
        else if (e.target.value.length > 0) {
            
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
        else
        this.setState({ notesCollectionObject: [...this.state.notesCollectionObject, { label: this.state.newValueToAdd, isChecked: false }] })
    }
    
    
    generateInputBox() {
        if (this.state.isAddInputBoxVisible)
        return (
            
            <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                // console.log("getInputBox -- target : ", e.target.childNodes)
            }} >
            <Divider />
            <Col xs={22} sm={11} md={11} lg={11}><Tooltip visible={this.state.isTooltipVisible} title="Input is required to add to the list" > <Input onChange={this.textBoxValueChanged.bind(this)} /> </Tooltip></Col>
            <Col xs={2} sm={1} md={1} lg={1}><Button shape="circle" onClick={this.addNewNoteEntry.bind(this)} ><Icon type="plus" /></Button></Col>
            </Row>
        )
        
    }
    
    onCBChecked(clicked_checkbox_index, event) {
        
        console.log("TRIGGERED.....")

        // var temp = this.state.notesCollectionObject.slice();
        
        // temp[clicked_checkbox_index].isChecked = !this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        
        // this.setState({ notesCollectionObject: temp })
        
        // this.setState( { notesCollectionObject[clicked_checkbox_index].isChecked : !this.state.notesCollectionObject[clicked_checkbox_index].isChecked } );
        
    }
    
    
    toDeleteEntry(index, event) {
        console.log("i : ", event)
        this.setState({
            notesCollectionObject: this.state.notesCollectionObject.filter((element, idx) => {
                return idx != index
            })
        })
        
        
    }
    
    changeTitle() {
        var x = prompt('Enter new title name')
        this.setState({ title: x })
    }
    
    showCompletedTasksDivider(){
        if(this.state.showDivider){
            return (
                <Divider>Completed Tasks</Divider>
            )
        }
    }
    
    render() {
        return (
            
            // <div style = {{ height : '90vh' }}>
            // <Row>
            // <Col xs></Col>
            // <Col xs> 
            
            
            <Card loading = { this.state.isLoading }  hoverable title={<div onClick={this.changeTitle.bind(this)}> {this.state.title} </div>} style={{ textAlign: 'left', background: 'white',/* marginTop: '150px'*/ }}>
            
            {
                
                this.state.unCheckedTasks.map((entry, idx) => {
                    return (
                        <Row key={idx} style={{ marginBottom: '20px', }} onClick={(e) => {
                            // console.log("current Target : ", e.currentTarget)
                            // console.log("target : ", e.target)
                        }} >
                        <Col xs={22} sm={11} md={11} lg={11}><Checkbox style={{ textAlign: 'left' }} checked = { entry.isChecked } onChange={this.onCBChecked.bind(this, idx)}> {entry.content} </Checkbox> </Col>
                        <Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this, idx)} shape="circle"><Icon type='close' /></Button></Col>
                        </Row>
                    )
                })
            }
            
            
            { this.showCompletedTasksDivider() }
            
            {
                
                this.state.checkedTasks.map((entry, idx) => {
                    return (
                        <Row key={idx} style={{ marginBottom: '20px', }} onClick={(e) => {
                            // console.log("current Target : ", e.currentTarget)
                            // console.log("target : ", e.target)
                        }} >
                        <Col xs={22} sm={11} md={11} lg={11}><Checkbox style={{ textAlign: 'left' }} checked = { entry.isChecked } onChange={this.onCBChecked.bind(this, idx)}> {entry.content} </Checkbox> </Col>
                        <Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.toDeleteEntry.bind(this, idx)} shape="circle"><Icon type='close' /></Button></Col>
                        </Row>
                    )
                })
                
            }
            {/*  input box - only 1 to be present at a time */}
            {this.generateInputBox()}
            
            <Button onClick={() => this.setState({ isAddInputBoxVisible: !this.state.isAddInputBoxVisible })} style={{ width: '100%' }} type="primary">ADD</Button>
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