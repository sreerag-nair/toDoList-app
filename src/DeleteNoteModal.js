import React, { Component } from 'react';
import { message, Modal } from 'antd';
import axios from 'axios';

class DeleteConfirmationModalComponent extends Component {


    state = {
        isDeleteConfirmationModalVisible : true,
        _idOfNote : this.props._noteID
    }


    //delete the note
    deleteYes(){
        axios.delete('http://localhost:8001/',{
            data : {
                _id : this.state._idOfNote 
            }}
    )
    .then((response) =>{
        console.log(response.body)
    })
    .catch((err) =>{

    })
}

    //just close the modal
    deleteNo(){
        console.log("NO!!" ,this.state)
        this.setState({ isDeleteConfirmationModalVisible : false })
        this.props.destroyDeletionModal()
    }

    render() {
        return (
            <Modal
                visible={ this.state.isDeleteConfirmationModalVisible }
                maskClosable = { false }
                onCancel={ this.deleteNo.bind(this) } 
                onOk={ this.deleteYes.bind(this) }
                closable={true}
                // getContainer = { (e) => console.log("dsfvsdg : ", this.getContainer) }
                destroyOnClose = {true}
            >
                Delete Note??
            </Modal>

        )
    }
}


export default DeleteConfirmationModalComponent