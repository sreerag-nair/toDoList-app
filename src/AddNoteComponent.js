import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Icon, Input, } from 'antd';
import { Col, Row } from 'react-flexbox-grid'

class AddNoteComponent extends Component {

    state = {
        title: "Hello There",
<<<<<<< HEAD
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
=======
        isAddInputBoxVisible: false,
        notesCollectionObject: [
            { isChecked : false ,value: 'First' },
            { isChecked : false ,value: 'Second' },
            { isChecked : false ,value: 'Third' },
            { isChecked : false ,value: 'Fourth' },

        ],
        newValueToAdd : ''
    }

    // {isChecked : , value : },
>>>>>>> a536a1222be73df7b3c8040986f9c3bed9a7fd84

    genElem() {
        // if (this.state.x)
        //     return (<Input style={{ marginBottom: '10px' }}
        //         prefix={<Checkbox style={{ marginRight: '20px' }} />} placeholder="Hello there" />)
<<<<<<< HEAD
        
=======

>>>>>>> a536a1222be73df7b3c8040986f9c3bed9a7fd84
        // This line generated boxes as many times as  u click it...
        this.setState({ enteredDataTest: [...this.state.enteredDataTest, { value: 'zDFSsdfg ' }] })
        console.log(this.state)
    }

    tbChanged(e) {
        // console.log("Added! e : ", e.target.value)
        this.setState({ newValueToAdd : e.target.value})
    }

<<<<<<< HEAD
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
=======
    addNewNoteEntry(e){
        this.setState({notesCollectionObject : [...this.state.notesCollectionObject , {isChecked : false ,value: this.state.newValueToAdd}]})
        // this.setState({newValueToAdd : ''})
        console.log( '---------------------START------------------------' )
        console.log( 'e.currentTarget : ', e.currentTarget )
        console.log( 'e.target : ', e.target.parentElement )
        console.log( '----------------------END-------------------------' )
    }

    
    genInputBox(){
        if(this.state.isAddInputBoxVisible)
            return(
                <Row style = {{ marginBottom : '20px' }} onClick = { (e) => {
                    console.log("getInputBox -- current Target : " , e.currentTarget.childNodes)
                    console.log("getInputBox -- target : " , e.target.childNodes) } } >
                    <Col xs={22} sm={11} md={11} lg={11}><Input onChange = { this.tbChanged.bind(this) }/></Col>
                    <Col xs={2} sm={1} md={1} lg={1}><Button shape = "circle" onClick = { this.addNewNoteEntry.bind(this) } ><Icon type = "plus"/></Button></Col>
                    {/* <Col xs={12} sm={9} md={10} lg={11}><Input size = 'small' /></Col> */}
>>>>>>> a536a1222be73df7b3c8040986f9c3bed9a7fd84
                    {/* <Col xs={6} sm={3} md={2} lg={1}><Button shape = "circle" size = "small" onClick = { () => alert('clicked') }>+</Button></Col> */}
                </Row>
            )
        
    }

    onChecked(clicked_checkbox){
        console.log("clicked : ", clicked_checkbox)
        
        // var updated = this.state.notesCollectionObject.slice()


    }

    render() {
        return (
            <Card title={<div onClick={() => prompt('title')}>{this.state.title}</div>} style={{ width: '30vw', height: '90vh', background: 'white', }}>

                {
                    this.state.notesCollectionObject.map((entry, idx) => {
                        return (
                            <Row key = { idx } style = {{ marginBottom : '20px' }} onClick = { (e) => {
                                console.log("current Target : " , e.currentTarget)
                                console.log("target : " , e.target) } } >
                                <Col xs={24} sm={12} md={12} lg={12}><Checkbox onChange = { this.onChecked }> { entry.value } </Checkbox> </Col>
                                {/* <Col xs={12} sm={9} md={10} lg={11}><Input size = 'small' /></Col> */}
                                {/* <Col xs={6} sm={3} md={2} lg={1}><Button shape = "circle" size = "small" onClick = { () => alert('clicked') }>+</Button></Col> */}
                            </Row>
                        )
                    })
                }

                {/*  input box - only 1 at a time */}
                { this.genInputBox() }
                    
                <Button onClick={ () => this.setState({ isAddInputBoxVisible : true }) } style={{ width: '100%' }} type="primary">ADD</Button>
            </Card>
        )
    }
}

export default AddNoteComponent;