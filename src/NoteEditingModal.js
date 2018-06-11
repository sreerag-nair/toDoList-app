import React, { Component } from 'react';
import { Button, Card, Checkbox, Icon, Input, message, Popover, Switch, Tooltip } from 'antd';
// import { Col, Row } from 'antd';
import { Col, Row } from 'react-flexbox-grid'
import axios from 'axios';

import ModalTestTab1 from './ModalTestTab1';
import ModalTestTab2 from './ModalTestTab2';


import NoteEditingModalContents from './NoteEditingModalContents';
import NoteEditingModalSharedWith from './NoteEditingModalSharedWith';
import NoteEditingModalAttachments from './NoteEditingModalAttachments';

class NoteEditingModal extends Component {

    state = {
        title: this.props.noteObj.title || "Click here to add title",
        key: 'tab1',
        _id: this.props.noteObj._id,
        isLoading: true,
        shouldChildContentSort: false,

        notesCollectionObject: [],
        entriesToDelete: [],

        attachmentsCollectionObject: [],
        sharedWithCollectionObject: [],
        updateInProgress: false,


    }

    componentWillMount() {
        // console.log("ON SUBMIT : ", this.props.noteObj._id)

        axios.get('http://localhost:8001/getcurrentnote/' + this.props.noteObj._id,

            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
                }
            })
            .then((response) => {
                console.log("resbod : ", response.data)

                this.setState({ notesCollectionObject: response.data, isLoading: false })
            })
    }


    //editing the existing note
    submitNote() {
        var objToSend = {}
        objToSend["noteTitle"] = this.state.title
        objToSend["toUpdateOrEnter"] = this.state.notesCollectionObject
        objToSend["toDelete"] = this.state.entriesToDelete
        objToSend["noteId"] = this.props.noteObj._id
        console.log("ON SUBMIT : ", objToSend)
        this.setState({ updateInProgress: true })

        axios({
            method: 'PUT',
            url: 'http://localhost:8001/update/' + this.props.noteObj._id,
            data: objToSend,
            headers: {
                Authorization: "Bearer " + localStorage.getItem('JWT_TOKEN')
            }
        })
            .then((response) => {
                // console.log("propzzz  : ", this.props.title)
                this.props.updateTitleInDashBoard(this.state._id, this.state.title)
                this.setState({ updateInProgress: false })
                message.success("Update successful.... :-)")
            })
            .catch((err) => {
                // console.log("ERROR IN NoteEditingModal : ", err)
                this.setState({ updateInProgress: false })
                message.error('In NoteEditingModal')
            })

    }



    populateNotesCollectionObject(notesCollectionObject) {
        this.setState({ notesCollectionObject: notesCollectionObject })
    }
    populateEntriesToDelete(entriesToDelete) {
        this.setState({ entriesToDelete: entriesToDelete })
    }


    populateAttachmentsCollectionObject(attachmentsCollectionObject) {
        this.setState({ attachmentsCollectionObject: attachmentsCollectionObject })
    }

    populateSharedWithCollectionObject(sharedWithCollectionObject) {
        this.setState({ sharedWithCollectionObject: sharedWithCollectionObject })
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }


    changeTitle(e) {
        this.setState({ title: e.target.value })
    }

    finishedLoading(r) {
        this.setState({ isLoading: r })
    }

    toSortEntries(switchState) {
        // console.log("recvd switchstate : ", switchState)
        this.setState({ shouldChildContentSort: switchState })

    }


    /***********************************************************/
    //in tabList below , key is the value used to display the current tab
    // and tab is the name that appears in the tab pane
    /***********************************************************/
    render() {

        const tabList = [{
            key: 'tab1',
            tab: <span><Icon type="bars" />Contents</span>,
        }, {
            key: 'tab2',
            tab: <span><Icon type="paper-clip" />Attachments</span>,
        },
        {
            key: 'tab3',
            tab: <span><Icon type="share-alt" />Shared with...</span>,
        }];



        const contentList = {
            tab1: <NoteEditingModalContents title={this.state.title} _id={this.props.noteObj._id}
                updateTitleInDashBoard={this.props.updateTitleInDashBoard}
                finishedLoading={this.finishedLoading.bind(this)} shouldChildContentSort={this.state.shouldChildContentSort}
                notesCollectionObject={this.state.notesCollectionObject}
                populateNotesCollectionObject={this.populateNotesCollectionObject.bind(this)}
                populateEntriesToDelete={this.populateEntriesToDelete.bind(this)} />,


            tab2: <ModalTestTab2 />,
            tab3: <h1>ModalTestTab3</h1>,

            // tab1: <NoteEditingModalContents title = { this.state.title } _id = { this.props.noteObj._id } updateTitleInDashBoard={this.props.updateTitleInDashBoard} editingModalOnCancel={this.props.editingModalOnCancel} />,
            // tab2: <NoteEditingModalAttachments />,
            // tab3 :<NoteEditingModalSharedWith />

        };



        return (

            <Card extra={<Switch disabled={(this.state.key === 'tab1') ? false : true} checkedChildren="Sorted" unCheckedChildren="Unsorted" onChange={this.toSortEntries.bind(this)} />}
                loading={this.state.isLoading} hoverable title={<Popover trigger="click" content={<Input onChange={this.changeTitle.bind(this)}
                    value={this.state.title} placeholder="Title input..." />} >
                    <div> {this.state.title} </div> </Popover>} style={{ textAlign: 'left', background: 'white',/* marginTop: '150px'*/ }}
                tabList={tabList} activeTabKey={this.state.key} onTabChange={(key) => { this.onTabChange(key, 'key') }}>

                {contentList[this.state.key]}

                {
                    // setTimeout(() => {
                    //     this.setState({ isLoading : true })
                    // }, 2000)
                }

                <Button loading={this.state.updateInProgress} onClick={this.submitNote.bind(this)} style={{ width: '50%', marginTop: '20px' }} type="primary dashed">Update</Button>
                <Button style={{ width: '50%', marginTop: '20px' }} type="danger" onClick={this.props.editingModalOnCancel} >Close</Button>
            </Card>
        )
    }
}

export default NoteEditingModal;