import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Icon, Input } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

const CheckboxGroup = Checkbox.Group;

class AddNoteComponent extends Component {
    
    
    submitNote(noteObj) {
        
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
            
        ],
        
        newValueToAdd: ''
    }
    
    // {isChecked : , value : },
    
    genElem() {
        // if (this.state.x)
        //     return (<Input style={{ marginBottom: '10px' }}
        //         prefix={<Checkbox style={{ marginRight: '20px' }} />} placeholder="Hello there" />)
        
        // This line generated boxes as many times as  u click it...
        // this.setState({ enteredDataTest: [...this.state.enteredDataTest, { value: 'zDFSsdfg ' }] })
        
        console.log(this.state)
    }
    
    tbChanged(e) {
        // console.log("Added! e : ", e.target.value)
        this.setState({ newValueToAdd: e.target.value })
        
    }
    
    addNewNoteEntry(e) {
        this.setState({ notesCollectionObject: [...this.state.notesCollectionObject, { label: this.state.newValueToAdd, isChecked: false }] })
    }
    
    
    generateInputBox() {
        if (this.state.isAddInputBoxVisible)
        return (
            <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                // console.log("getInputBox -- target : ", e.target.childNodes)
            }} >
            <Col xs={22} sm={11} md={11} lg={11}><Input onChange={this.tbChanged.bind(this)} /></Col>
            <Col xs={2} sm={1} md={1} lg={1}><Button shape="circle" onClick={this.addNewNoteEntry.bind(this)} ><Icon type="plus" /></Button></Col>
            </Row>
        )
        
    }
    
    onCBChecked(clicked_checkbox_index, event) {
        
        var temp = this.state.notesCollectionObject.slice();
        
        temp[clicked_checkbox_index].isChecked = !this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        
        this.setState({ notesCollectionObject : temp   })
        
        // this.setState( { notesCollectionObject[clicked_checkbox_index].isChecked : !this.state.notesCollectionObject[clicked_checkbox_index].isChecked } );
    
    }
    
    
    toDeleteEntry(index, event){
        // console.log("i : ", index)
        this.setState({ notesCollectionObject : this.state.notesCollectionObject.filter((element, idx) =>{
            return idx != index
        })
    })
    
    
}

changeTitle(){
    var x = prompt('Enter new title name')
    this.setState({ title : x })
}

render() {
    return (
        <Row  >
        <Col  xs={12}>
        <Row center="xs">
        <Col xs={6} >
        
        <Card title={<div onClick={ this.changeTitle.bind(this) }>{this.state.title}</div>} style={{ textAlign : 'left',  background: 'white', }}>
        
        {
            this.state.notesCollectionObject.map((entry, idx) => {
                return (
                    <Row key={idx} style={{ marginBottom: '20px',  }} onClick={(e) => {
                        // console.log("current Target : ", e.currentTarget)
                        // console.log("target : ", e.target)
                    }} >
                    <Col xs={22} sm={11} md={11} lg={11}><Checkbox style={{ textAlign: 'left' }} onChange={this.onCBChecked.bind(this,idx)}> {entry.label} </Checkbox> </Col>
                    <Col xs={2} sm={1} md={1} lg={1}><Button onClick = { this.toDeleteEntry.bind(this,idx) } shape="circle"><Icon type='close' /></Button></Col>
                    </Row>
                )
            })
        }
        
        {/*  input box - only 1 at a time */}
        {this.generateInputBox()}
        
        <Button onClick={() => this.setState({ isAddInputBoxVisible: !this.state.isAddInputBoxVisible })} style={{ width: '100%' }} type="primary">ADD</Button>
        <Button  onClick = { () => console.log(this.state) }  style={{ width: '100%', marginTop : '20px' }} type="primary">Check</Button>
        </Card>
        
        </Col>
        </Row>
        </Col>
        </Row>
        
    )
}
}

export default AddNoteComponent;