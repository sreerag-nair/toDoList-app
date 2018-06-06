import React, { Component } from 'react';
import { Button, Card, Checkbox, Icon, Input, message, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

class NoteEditingModalAttachments extends Component {
    
    state = {
        title : this.props.title,
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        newValueToAdd: '',
        showDivider: true,
        entriesToDelete : [],
        updateInProgress : false,
    }
    
    componentWillReceiveProps(){
        // console.log("props : " , this.props.shouldChildContentSort)
        
        var tempNoteArray = [];

        if(!this.props.shouldChildContentSort){
            
            tempNoteArray = this.state.notesCollectionObject.slice();
            tempNoteArray.sort(function(a,b){
                return a.isChecked - b.isChecked
            })
            
            this.setState({ notesCollectionObject : tempNoteArray })
            // console.log("temp : ", tempNoteArray)
            
        }
        else{

            tempNoteArray = this.state.notesCollectionObject.slice()
            var randomArray = []

            for(var i = tempNoteArray.length; i > 0; i--){
                console.log(" : : : ", Math.floor(Math.random() * (tempNoteArray.length)))
            }
        }
        
        
    }
    
    componentWillMount() {
        // console.log("ON SUBMIT : ", this.props.noteObj._id)
        
        axios.get('http://localhost:8001/getcurrentnote/' + this.props._id,
        
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
        .then((response) => {
            // console.log("resbod : ", response.data)
            this.props.finishedLoading();
            this.setState({ notesCollectionObject: response.data })
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
        var objToSend = {}
        objToSend["noteTitle"] = this.props.title
        objToSend["toUpdateOrEnter"] = this.state.notesCollectionObject
        objToSend["toDelete"] = this.state.entriesToDelete
        // objToSend["noteId"] = this.props.noteObj._id
        console.log("ON SUBMIT : ", objToSend)
        this.setState({ updateInProgress : true })
        
        axios({
            method : 'PUT',
            url : 'http://localhost:8001/update/'+ this.props._id,
            data : objToSend ,
            headers :{
                Authorization : "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
        .then((response) =>{
            // console.log("propzzz  : ", this.props.title)
            this.props.updateTitleInDashBoard(this.props._id, this.props.title)
            this.setState({ updateInProgress : false })
            message.success("Update successful.... :-)")
        })
        .catch((err) =>{
            this.setState({ updateInProgress : false })
            message.error('Some error occured....please try again later')
        })
        
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
        else{
            // console.log("HERE HERE : ", this.state.newValueToAdd);
            this.setState({ notesCollectionObject: [...this.state.notesCollectionObject, { content: this.state.newValueToAdd, isChecked: false }],
                newValueToAdd : '' })
                
            }
        }
        
        
        generateInputBox() {
            return (
                
                <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                    // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                    // console.log("getInputBox -- target : ", e.target.childNodes)
                }} >
                <Col xs={22} sm={11} md={11} lg={11}><Tooltip visible={this.state.isTooltipVisible} title="Input is required to add to the list" > <Input value = { this.state.newValueToAdd } onChange={this.textBoxValueChanged.bind(this)} /> </Tooltip></Col>
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
            // this.state.notesCollectionObject.filter((element, idx) => {
            //     return idx != index
            // })
            var tempArray = this.state.notesCollectionObject.slice()
            
            this.setState({ entriesToDelete : [...this.state.entriesToDelete, tempArray.find(function(x,idx){
                if((idx === index) && (x._id != null))
                return x
            })] , 
            notesCollectionObject:  tempArray.filter((element, idx) => {
                return idx !== index
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
            <Button loading = { this.state.updateInProgress } onClick={this.submitNote.bind(this)} style={{ width: '50%', marginTop: '20px' }} type="primary dashed">Update</Button>
            <Button style={{ width: '50%', marginTop: '20px' }} type="danger" onClick = { this.props.editingModalOnCancel } >Close</Button>
            </div>
            
            // </Col>
            // <Col xs></Col>
            // </Row>
            
            // </div>
        )
    }
}

export default NoteEditingModalAttachments;