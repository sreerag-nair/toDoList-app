import React, { Component } from 'react';
import { Card, Checkbox, Divider, Icon, Input } from 'antd';


class AddNoteComponent extends Component {

    state = {
        title : "Hello There",
        cbContents : []
    }

    add(e){
        console.log("Added! e : ", e.target)
    }

    render() {
        return (
            <Card title = { this.state.title } style={{ width: '30vw', height: '90vh', background: 'olive' , textAlign : 'center'}}>
                {/* <Divider /> */}
                <Input style = {{ marginBottom : '10px' }} addonBefore = {<Checkbox />} addonAfter = { <Icon style = {{ cursor : 'pointer' }} onClick = {(e) => console.log(this)} type = "plus"/> } placeholder = "Hello there" />
                {/* <Input style = {{ marginBottom : '10px' }} addonBefore = {<Checkbox />} addonAfter = { <Icon style = {{ cursor : 'pointer' }} onClick = {(e) => this.add(e)} type = "plus"/> } placeholder = "Hello there" /> */}
                {/* <Input style = {{ marginBottom : '10px' }} addonBefore = {<Checkbox />} addonAfter = { <Icon style = {{ cursor : 'pointer' }} onClick = {(e) => this.add(e)} type = "plus"/> } placeholder = "Hello there" /> */}
                {/* <Input style = {{ marginBottom : '10px' }} addonBefore = {<Checkbox />} addonAfter = { <Icon style = {{ cursor : 'pointer' }} onClick = {(e) => this.add(e)} type = "plus"/> } placeholder = "Hello there" /> */}
                {/* <Input style = {{ marginBottom : '10px' }} addonBefore = {<Checkbox />} addonAfter = { <Icon style = {{ cursor : 'pointer' }} onClick = {(e) => this.add(e)} type = "plus"/> } placeholder = "Hello there" /> */}
                {/* <Divider /> */}
            </Card>
        )
    }
}

export default AddNoteComponent;