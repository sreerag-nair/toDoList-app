import React, { Component } from 'react';
import { Button, Col, Layout, message, Modal, Row,  } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NoteEditingModal from './NoteEditingModal';
import DummyCardComponent from './DummyCardComponent';
const { Content } = Layout;

class CardPopulatorDashBoardComponent extends Component {

    state = {
        notesObjArray: [],
        isNoteEditingModalVisible: false,
        currentlySelectedCard: '',
        noteToDeleteID: '',
        isDeleteConfirmationModalVisible: false
    }

    componentWillMount() {
        message.loading("Talking to the database.... please wait", 3)
        axios.get('http://localhost:8001/getnotes',
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            })
            .then(messages => {
                this.setState({ notesObjArray: messages.data })
                message.success("Talking to the database complete...")
                console.log("CONSOLE DATA : ", messages.data)
            })
            .catch((err) => {
                if(err.response.status){
                    if (err.response.status === 401) {
                        console.log("UNAUTHORIZED USER IN CARD POPULATOR!! : ")
                        message.error("You haven't logged in, have you ? .... please log in :(")
                        this.props.history.push('/login')
                    }
                }
                else{
                    message.error("Some error occured, please try again later :(...")
                }
            })
    }


    toReduce(a) {
        // this function breaks the acquired object array into 
        // an array of arrays each containing 3 elements
        // The outer array will be of length Math.ceil( recvObj.length() / 3 )
        return a.reduce((rows, value, index) =>
            (index % 3 === 0 ? rows.push([value]) : rows[rows.length - 1].push(value)) && rows, [])
    }


    getClickedCard(cardIndex) {
        this.setState({ currentlySelectedCard: cardIndex, isNoteEditingModalVisible: true })
        // console.log("CardIndex : ", this.state.notesObjArray[cardIndex])
    }

    modalOnOK = (e) => {
        this.setState({ isNoteEditingModalVisible: false })
    }

    editingModalOnCancel = (e) => {
        this.setState({ isNoteEditingModalVisible: false })
    }

    getCardToDelete = (cardID) => {
        this.setState({ isDeleteConfirmationModalVisible: true, noteToDeleteID: cardID })
        // console.log("state: ", this.state);
    }

    //delete the note
    deleteYes() {

        axios({
            method: 'DELETE',
            url: 'http://localhost:8001/deletenote/' + this.state.noteToDeleteID,
            data: {
                // x : "123"
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
            .then(response => {

                this.setState({ isDeleteConfirmationModalVisible: false })
                message.success("Delete successful....")
                var updatednotesObjArray = this.state.notesObjArray.slice()

                updatednotesObjArray.splice(updatednotesObjArray.findIndex((x) => {
                    //get the index of the card removed
                    return x._id === this.state.noteToDeleteID
                }), 1)

                this.setState({ notesObjArray: updatednotesObjArray })
            })
            .catch(err => {
                message.error("There was some problem... try again later")
                console.log("err : ", err)
            })
    }

    // close the modal
    deleteNo() {
        this.setState({ isDeleteConfirmationModalVisible: false, noteToDeleteID: '' })
    }

    updateTitleInDashBoard(idToUpdate, updateTitleTo) {
        console.log("TITLE CHANGE RECEIVED : ", updateTitleTo)
        var tempNoteArray = this.state.notesObjArray.slice()

        tempNoteArray[tempNoteArray.findIndex(function (note) {
            return idToUpdate === note._id
        })].title = updateTitleTo;

        tempNoteArray[tempNoteArray.findIndex(function (note) {
            return idToUpdate === note._id
        })].updatedDate = new Date().toLocaleString("en-US")

        // console.log("updateTitleInDashBoard : ", tempNoteArray[tempNoteArray.findIndex(function(note){
        //     return idToUpdate === note._id
        // })])

        this.setState({ notesObjArray: tempNoteArray })

    }

    render() {
        if (this.state.notesObjArray.length) {
            return (
                <div style={{ backgroundColor: '#0091FA', height: '90vh', width: '100%' }}>

                    <Content style={{ /* margin: '24px 16px 0',*/ overflow: 'initial' }}>




                        {/* -------------------------MODAL FOR EDITING NOTES---------------------------- */}
                        <Modal visible={this.state.isNoteEditingModalVisible}
                            maskClosable={true}
                            maskStyle={{ width: '100%' }}
                            // onCancel={this.editingModalOnCancel}
                            closable={false}
                            destroyOnClose={true}
                            footer={null}
                            style={{ heignt: '10vh' }}
                        >
                            <NoteEditingModal updateTitleInDashBoard={this.updateTitleInDashBoard.bind(this)} editingModalOnCancel={this.editingModalOnCancel} noteObj={this.state.notesObjArray.find(note => { return note._id === this.state.currentlySelectedCard })} />
                        </Modal>
                        {/* -------------------------MODAL FOR EDITING NOTES ENDS---------------------------- */}





                        {/* -------------------------DELETE NOTE MODAL--------------------------------------- */}
                        <Modal
                            visible={this.state.isDeleteConfirmationModalVisible}
                            maskClosable={false}
                            onCancel={this.deleteNo.bind(this)}
                            onOk={this.deleteYes.bind(this)}
                            closable={true}
                            destroyOnClose={true}
                        >
                            Delete Note?
                        </Modal>
                        {/* -------------------------DELETE NOTE MODAL ENDS----------------------------------- */}

                        {/* generate cards */}

                        {
                            this.toReduce(this.state.notesObjArray).map(
                                (collection_of_three_notes, idx) => {
                                    return (
                                        <div key={idx} style={{ background: '#0091FA', padding: '30px' }}>
                                            <Row gutter={16}>
                                                {
                                                    collection_of_three_notes.map(
                                                        (note, inner_idx) => {
                                                            return (
                                                                <Col key={inner_idx} span={8}>
                                                                    <DummyCardComponent getCardToDelete={this.getCardToDelete.bind(this)} getClickedCard={this.getClickedCard.bind(this)} cardIndex={(idx * 3) + inner_idx} noteObj={note} />
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
            // message.info("You seem to have no note made....")
            // message.info("Create a new node by clicking on the '+'",5)
            return (
                <div style={{ backgroundColor: '#0091FA', height: '90vh', width: '100%' }}>
                    {/* <h1>YOU HAVE NO NOTES CREATED IN YOUR ACCOUNT....
                         CLICK ON THE ADD BUTTON ON THE LEFT SIDE TO ADD A NEW NOTE...
                    </h1> */}
                    <Link to = '/dashboard/addnote'>
                    <Button type = "primary" style = {{ textAlign : 'center', fontSize : '125px' , height : '90vh', width : '100%' }}>
                    ADD NOTE +
                    </Button>                        
                    </Link>
                </div>
            )
        }
    }

}

export default CardPopulatorDashBoardComponent;
