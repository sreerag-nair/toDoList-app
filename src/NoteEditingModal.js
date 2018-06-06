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
        isLoading : false,
        shouldChildContentSort : false,


    }



    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }


    changeTitle(e) {
        this.setState({ title: e.target.value })
    }

    finishedLoading(){
        this.setState({ isLoading : false })
    }

    toSortEntries(switchState){
        
        this.setState({ shouldChildContentSort : switchState })

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
            tab1: <NoteEditingModalContents title = { this.state.title } _id = { this.props.noteObj._id }
             updateTitleInDashBoard={this.props.updateTitleInDashBoard} editingModalOnCancel={this.props.editingModalOnCancel} 
             finishedLoading = { this.finishedLoading.bind(this) } shouldChildContentSort = { this.state.shouldChildContentSort } />,
            tab2: <ModalTestTab2 />,
            tab3: <h1>ModalTestTab3</h1>,

            // tab1: <NoteEditingModalContents title = { this.state.title } _id = { this.props.noteObj._id } updateTitleInDashBoard={this.props.updateTitleInDashBoard} editingModalOnCancel={this.props.editingModalOnCancel} />,
            // tab2: <NoteEditingModalAttachments />,
            // tab3 :<NoteEditingModalSharedWith />

        };



        return (

            <Card extra = { <Switch disabled = { (this.state.key === 'tab1') ? false : true } checkedChildren="Sorted" unCheckedChildren="Unsorted" onChange = { this.toSortEntries.bind(this) } /> }
                loading={this.state.isLoading} hoverable title={<Popover trigger="click" content={<Input onChange={this.changeTitle.bind(this)}
                    value={this.state.title} placeholder="Title input..." />} >
                    <div> {this.state.title} </div> </Popover>} style={{ textAlign: 'left', background: 'white',/* marginTop: '150px'*/ }}
                tabList={tabList} activeTabKey = { this.state.key } onTabChange={(key) => { this.onTabChange(key, 'key') }}>

                {contentList[this.state.key]}

            </Card>
        )
    }
}

export default NoteEditingModal;