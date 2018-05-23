import React, { Component } from 'react';
import { Col, Layout, Row } from 'antd';
import CardComponent from './CardComponent';
import axios from 'axios';
const { Content } = Layout;

class CardPopulatorDashBoardComponent extends Component {

    state = {
        notesObjArray: null
    }

    componentWillMount() {
        axios.post('http://localhost:8001/dash').
            then(message => {
                console.log("CONSOLE DATA : ", message)
                this.setState({ notesObjArray: message.data })
            })
    }


    toReduce(a) {
        // this function breaks the acquired object array into 
        // an array of arrays each containing 3 elements
        // The outer array will be of length Math.ceil( recvObj.length() / 3 )
        return a.reduce((rows, value, index) =>
            (index % 3 == 0 ? rows.push([value]) : rows[rows.length - 1].push(value)) && rows, [])
    }

    render() {
        if (this.state.notesObjArray) {
            return (
                //generate cards
                <Content style={{ /* margin: '24px 16px 0',*/ overflow: 'initial' }}>

                    {
                        this.toReduce(this.state.notesObjArray).map(
                            (collection_of_three_notes, idx) => {
                                return (
                                    <div key={idx} style={{ background: '#ECECEC', padding: '30px' }}>
                                        <Row gutter={16}>
                                            {
                                                collection_of_three_notes.map(
                                                    (note, idx) => {
                                                        return (
                                                            <Col key={idx} span={8}>
                                                                <CardComponent key={idx} noteObj={note} dateVar={new Date().toString()} />
                                                            </Col>
                                                        )
                                                    }
                                                )
                                            }
                                        </Row>
                                    </div>
                                )
                            }
                        )
                    }
                </Content>
            )
        }
        else {
            return (
                <h1>NOTHING TO SHOW</h1>
            )
        }
    }

}

export default CardPopulatorDashBoardComponent;
