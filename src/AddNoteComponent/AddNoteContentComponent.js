import React, { Component } from 'react';
import { message, Button, Card, Checkbox, Icon, Input, Popover, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

// const CheckboxGroup = Checkbox.Group;

class AddNoteContentComponent extends Component {
    
    state = {
        isAddInputBoxVisible: false,
        isTooltipVisible: false,
        notesCollectionObject: [],
        isAddButtonDisabled: true,
        isSubmitButtonDisabled: true,
        displaySubmitButtonLoading: false,
        disableAddButton: false,
        
    }
    
    componentWillReceiveProps(){

        console.log(" notesCollectionObject :", this.props.notesCollectionObject,)
        console.log("isSubmitButtonDisabled : " ,this.props.isSubmitButtonDisabled,)
        console.log("displaySubmitButtonLoading : ",this.props.displaySubmitButtonLoading,)
        console.log("isAddInputBoxVisible : ", this.props.isAddInputBoxVisible)
        console.log("isAddButtonDisabled : ",this.props.isAddButtonDisabled,)
        console.log("isTooltipVisible : ", this.props.isTooltipVisible)

        this.setState({ 
            notesCollectionObject : this.props.notesCollectionObject,
            isSubmitButtonDisabled :  this.props.isSubmitButtonDisabled,
            displaySubmitButtonLoading : this.props.displaySubmitButtonLoading,
            isAddInputBoxVisible : this.props.isAddInputBoxVisible,
            isAddButtonDisabled : this.props.isAddButtonDisabled,
            isTooltipVisible : this.props.isTooltipVisible
         })
    }


    


    
    
    generateInputBox() {
        // if (this.state.isAddInputBoxVisible)
        return (
            <Row style={{ marginBottom: '20px' }} onClick={(e) => {
                // console.log("getInputBox -- current Target : ", e.currentTarget.childNodes)
                // console.log("getInputBox -- target : ", e.target.childNodes)
            }} >
            <Col xs={22} sm={11} md={11} lg={11}><Tooltip visible={this.state.isTooltipVisible} title="Please enter something here to add it to the list" > <Input onChange={this.props.textBoxValueChanged} value={this.props.newValueToAdd} /> </Tooltip></Col>
            <Col xs={2} sm={1} md={1} lg={1}><Button disabled={this.state.isAddButtonDisabled} shape="circle" onClick={this.props.addNewNoteEntry} ><Icon type="plus" /></Button></Col>
            </Row>
        )
        
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
                        <Col xs={22} sm={11} md={11} lg={11}><Checkbox style={{ textAlign: 'left' }} onChange={ this.props.onCBChecked( idx ) }> {entry.content} </Checkbox> </Col>
                        <Col xs={2} sm={1} md={1} lg={1}><Button onClick={this.props.toDeleteEntry(idx)} shape="circle"><Icon type='close' /></Button></Col>
                        </Row>
                    )
                })
            }
            
            {/*  input box - only 1 at a time */}
            {this.generateInputBox()}
            
            {/* <Button onClick={() => this.setState({ isAddInputBoxVisible: !this.state.isAddInputBoxVisible })} disabled={this.state.disableAddButton} style={{ width: '100%' }} type="primary">ADD</Button> */}
            <Button onClick={this.props.submitNote} style={{ width: '50%', marginTop: '20px' }} disabled={this.state.isSubmitButtonDisabled} loading={this.state.displaySubmitButtonLoading} type="primary">Add note</Button>
            <Button style={{ width: '50%', marginTop: '20px' }} onClick={this.props.onCancel} type="danger">Cancel</Button>
            
            </span>
            //         </Card> </Col>
            //         <Col xs></Col>
            //     </Row>
            
            // </div>
        )
    }
}

export default AddNoteContentComponent;