import React, { Component } from 'react';
import { Col, Layout, Row } from 'antd';
import CardComponent from './CardComponent';
const { Content } = Layout;

class CardPopulatorDashBoardComponent extends Component {

    recvdObjectArray = [];
    notesObjArray = [
        {
            title: 'Shopping List',
            list: [
                {
                    content: 'Eggs are required for the body',
                    isChecked: true
                },
                {
                    content: 'Milk is white in color',
                    isChecked: true
                },
                {
                    content: 'Cereals always require milk.',
                    isChecked: false
                },
                {
                    content: 'Bread and butter make a man\'s breakfast',
                    isChecked: true
                },
            ]
        },
        {
            title: 'Word List',
            list: [
                {
                    content: 'Cornucopia means too many in number',
                    isChecked: false
                },
                {
                    content: 'Abtruse means to interpret in a specific way',
                    isChecked: false

                },
                {
                    content: 'Orwellian is a term associated with a dystopian world',
                    isChecked: true
                },
                {
                    content: 'Obtuse means slow to understand',
                    isChecked: false
                },
            ]
        },
        {
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
                }
            ]
        },
        {
            title: 'Shopping List',
            list: [
                {
                    content: 'Bring eggs',
                    isChecked: true
                },
                {
                    content: 'DONOT FORGET MILK!',
                    isChecked: true
                },
                {
                    content: 'ALWAYS BRING BREAD!!',
                    isChecked: false
                },
                {
                    content: 'NEVER FORGET THE KID!!',
                    isChecked: true
                },
            ]
        },
        {
            title: 'Word List',
            list: [
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
                },
            ]
        },
        {
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
                }
            ]
        },
        {
            title: 'Shopping List',
            list: [
                {
                    content: 'Eggs',
                    isChecked: true
                },
                {
                    content: 'Milk',
                    isChecked: true
                },
                {
                    content: 'Cereals',
                    isChecked: false
                },
                {
                    content: 'Bread',
                    isChecked: true
                },
            ]
        },
        {
            title: 'Word List',
            list: [
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
                },
            ]
        },
        {
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
                }
            ]
        }
    ]


    toReduce(a) {
        // this function breaks the acquired object array into 
        // an array of array each containing 3 elements
        // The outer array will be of length Math.ceil( recvObj.length() / 3 )
        return a.reduce((rows, value, index) =>
            (index % 3 == 0 ? rows.push([value]) : rows[rows.length - 1].push(value)) && rows, [])
    }

    render() {
        return (
            //generate cards
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>

                {
                    this.toReduce(this.notesObjArray).map(
                        (collection_of_three_notes, idx) => {
                            return (
                                <div key={idx} style={{ background: '#ECECEC', padding: '30px' }}>
                                    <Row gutter={16}>
                                        {
                                            collection_of_three_notes.map(
                                                (note, idx) => {
                                                    return (
                                                        <Col key={idx} span={8}>
                                                            <CardComponent noteObj={note} dateVar={new Date().toString()} />
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

}

export default CardPopulatorDashBoardComponent;
