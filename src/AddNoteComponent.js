import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Icon, Input, } from 'antd';
import { Col, Row } from 'react-flexbox-grid'

class AddNoteComponent extends Component {

    state = {
        title: "Hello There",
        cbContents: [],
        x: false,
        enteredDataTest: [
            // { value: 'First' },
            // { value: 'Second' },
            // { value: 'Third' },
            // { value: 'Fourth' },
            // { value: 'Fifth' }

        ]
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

    add(e) {
        console.log("Added! e : ", e.target)
    }

    render() {
        return (
            <Card title={<div onClick = {() => prompt('title')}>{this.state.title}</div>} style={{ width: '30vw', height: '90vh', background: 'white', textAlign: 'center' }}>

                {/*  input box - only 1 at a time */}
                <Row style = {{ marginBottom : '20px' }} onChange = { (e) => {
                    console.log("current Target : " , e.currentTarget)
                    console.log("target : " , e.target)
                } } >
                    <Col idx = '55' xs={12} sm={3} md={2} lg={1}><Checkbox /></Col>
                    <Col xs={12} sm={9} md={10} lg={11}><Input size = 'small' /></Col>
                    {/* <Col xs={6} sm={3} md={2} lg={1}><Button shape = "circle" size = "small" onClick = { () => alert('clicked') }>+</Button></Col> */}
                </Row>


                {this.state.enteredDataTest.map((obj, idx) => {
                    return <div key={idx}><Checkbox /> <Input /></div>
                })}
                {/* {this.getInputBox()} */}
                <Button onClick={this.genElem.bind(this)} style={{ width: '100%' }} type="primary">ADD</Button>
            </Card>
        )
    }
}

export default AddNoteComponent;