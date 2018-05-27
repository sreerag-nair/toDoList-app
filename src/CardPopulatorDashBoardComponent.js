import React, { Component } from 'react';
import { Col, Layout, Modal, Row } from 'antd';
import CardComponent from './CardComponent';
import axios from 'axios';
import NoteEditingModal from './NoteEditingModal';
const { Content } = Layout;

class CardPopulatorDashBoardComponent extends Component {
    
    state = {
        notesObjArray: null,
        isModalVisible : false,
        currentlySelectedCard : ''
    }
    
    componentWillMount() {
        axios.post('http://localhost:8001/dashboard',{},
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        }).
        then(message => {
            // console.log("CONSOLE DATA : ", message)
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
    
    getClickedCard(cardIndex){
        this.setState({  currentlySelectedCard : cardIndex , isModalVisible : true })
        // console.log("CardIndex : ", this.state.notesObjArray[cardIndex])
    }

    modalOnOK = (e) =>{
        this.setState({ isModalVisible : false })
    }

    modalOnCancel = (e) =>{
        this.setState({ isModalVisible : false })
    }
    
    render() {
        if (this.state.notesObjArray) {
            return (
                <div>
                
                
                
                
                {/* generate cards */}
                <Content style={{ /* margin: '24px 16px 0',*/ overflow: 'initial' }}>

                <Modal visible = { this.state.isModalVisible } 
                maskClosable = { false }
                maskStyle = {{ width : '100%' }}
                onOk = { this.modalOnOK }
                onCancel = { this.modalOnCancel }
                >
                {/* <CardComponent noteObj = { this.state.notesObjArray[this.state.currentlySelectedCard] } /> */}
                <NoteEditingModal noteObj = { this.state.notesObjArray[this.state.currentlySelectedCard] } />
                </Modal>
                
                {
                    this.toReduce(this.state.notesObjArray).map(
                        (collection_of_three_notes, idx) => {
                            return (
                                <div key={idx} style={{ background: '#ECECEC', padding: '30px' }}>
                                <Row gutter={16}>
                                {
                                    collection_of_three_notes.map(
                                        (note, inner_idx) => {
                                            return (
                                                <Col key={inner_idx} span={8}>
                                                <CardComponent getClickedCard = { this.getClickedCard.bind(this) } cardIndex={(idx * 3) + inner_idx } noteObj={note} dateVar={new Date().toString()} />
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
                </div>
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
