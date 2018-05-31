import React, { Component } from 'react';
import { Card, Icon, Tooltip } from 'antd';


class DummyCardComponent extends Component{

    state = {

    }

    render(){
        return(
            <Card /*onClick = { () => this.props.getClickedCard(this.props.noteObj._id) }*/ bordered  title={this.props.noteObj.title} bordered={true} extra={<Tooltip title={"Created at " + this.props.noteObj.date}><Icon type="calendar" /></Tooltip>}
                hoverable='true' style={{ textAlign : 'center' }}
                actions={[<Tooltip title="Edit note">
                    <Icon type="edit" onClick={ () => {
                        // console.log('Add Clicked! : ', this.props.cardIndex)}
                        this.props.getClickedCard(this.props.noteObj._id)
                    }}
                        
                        />
                </Tooltip>, <Tooltip title="Delete note">
                <Icon onClick = { () =>{
                        // console.log("this : " ,this)
                        this.props.getCardToDelete(this.props.noteObj._id)
                    }
                } type="delete" /></Tooltip>]}>
                <div id = "HELLOTHERE">
                    {/* {console.log("noteObj : ", this.props.noteObj)} */}
                    {/* THE FIRST CHECKBOX ELEMENT REQUIRES A MARGINLEFT TO 8px STYLE TO ALIGN PROPERTY */}
                    <br />
                </div>
            </Card>
        )
    }
}


export default DummyCardComponent