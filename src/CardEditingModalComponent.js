import React, { Component } from 'react';
import { Button, Card, Checkbox, Icon, Input, Layout, Modal, Popover } from 'antd';

import { Col, Row } from 'react-flexbox-grid'


class CardEditingModalComponent extends Component {

    state = {
        notesCollectionObject: {
            title: 'Villain List',
            list: [
                {
                    content: 'Joker',
                    isChecked: false
                },
                {
                    content: 'Copperhead',
                    isChecked: true
                },
                {
                    content: 'Prometheus',
                    isChecked: false
                },
                {
                    content: 'Harley Quinn',
                    isChecked: true
                },
                {
                    content: 'Cornucopia',
                    isChecked: false
                },
                {
                    content: 'Abtruse',
                    isChecked: false

                },
                {
                    content: 'Orwellian',
                    isChecked: true
                },
                {
                    content: 'Obtruse',
                    isChecked: false
                }
            ]
        },
        completeEntries: [],
        incompleteEntries: []

    }

    editNoteEntry(index, e) {
        console.log("INDEX  : ", index)

    }

    onCBChecked(clicked_checkbox_index, event) {

        console.log("TRIGGERED.....")
        var temp = this.state.notesCollectionObject;//.slice();
        temp.list[clicked_checkbox_index].isChecked = !this.state.notesCollectionObject.list[clicked_checkbox_index].isChecked
        this.setState({ noteContent: temp })
        // this.setState( { notesCollectionObject[clicked_checkbox_index].isChecked : !this.state.notesCollectionObject[clicked_checkbox_index].isChecked } );

    }

    ipTest(clicked_checkbox_index, e){
        // console.log("e : ", e.target)
        // console.log("index : ", index)
        var temp = this.state.notesCollectionObject//.list.slice();
        temp.list[clicked_checkbox_index].content = e.target.value //!this.state.notesCollectionObject[clicked_checkbox_index].isChecked
        this.setState({ notesCollectionObject: temp })

    }


    render() {
        return (

            <Card title="HELLO THERE" >
                {
                    this.state.notesCollectionObject.list.map((entry, idx) => {
                        return (
                            <Row key={idx} style={{ marginBottom: '20px', }} onClick={(e) => {
                                // console.log("current Target : ", e.currentTarget)
                                // console.log("target : ", e.target)
                            }} >
                                {/* style = {{ textDecorationLine: 'line-through' }} */}
                                <Col xs={20} sm={10} md={10} lg={10}><Checkbox style={{ textAlign: 'left' }} checked={entry.isChecked} onChange={this.onCBChecked.bind(this, idx)} >
                                    <span style={{ textDecorationLine: entry.isChecked ? 'line-through' : 'none' }} >
                                        {entry.content}
                                    </span>
                                </Checkbox> </Col>
                                <Col xs={2} sm={1} md={1} lg={1}>
                                <Popover trigger = "click" content = { <span><Input value = { entry.content } onChange = { this.ipTest.bind(this,idx) } /><Button shape = "circle"><Icon type = "check" /></Button><Button shape = "circle"><Icon type = "close" /></Button></span> }>
                                <Button shape="circle" onClick={this.editNoteEntry.bind(this, idx)} ><Icon type="edit" /></Button>
                                </Popover>
                                </Col>
                                <Col xs={2} sm={1} md={1} lg={1}><Button shape="circle"><Icon type='close' /></Button></Col>
                            </Row>
                        )
                    })
                }
            </Card>


        )
    }
}

export default CardEditingModalComponent;