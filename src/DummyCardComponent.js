import React, { Component } from 'react';
import { Card, Icon, Tooltip } from 'antd';


class DummyCardComponent extends Component{

    state = {

    }

    render(){
        return(
            <Card onClick = { () => this.props.getClickedCard(this.props.noteObj._id) } bordered  title={this.props.noteObj.title} bordered={false} extra={<Tooltip title={this.props.noteObj.date}><Icon type="calendar" /></Tooltip>}
                hoverable='true' style={{ textAlign : 'center' }}
                actions={[<Tooltip title="Add note">
                    <Icon type="plus" onClick={ () => {
                        // console.log('Add Clicked! : ', this.props.cardIndex)}
                        console.log("this : " ,this)
                        this.props.getClickedCard(this.props.noteObj._id)
                    }}
                        
                        />
                </Tooltip>, <Tooltip title="Delete note"><Icon onClick = {
                    () =>{
                        this.props.deleteNoteTriggered(this.props.noteObj._id)
                    }
                } type="delete" /></Tooltip>]}>
                <div>
                    {/* {console.log("noteObj : ", this.props.noteObj)} */}
                    {/* THE FIRST CHECKBOX ELEMENT REQUIRES A MARGINLEFT TO 8px STYLE TO ALIGN PROPERTY */}
                    <br />
                </div>
            </Card>
        )
    }
}


export default DummyCardComponent