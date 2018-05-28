import React, { Component } from 'react';
import { Card, Icon, Tooltip } from 'antd';


class DummyCardComponent extends Component{

    state = {

    }

    render(){
        return(
            <Card onClick = { () => console.log("CLICKEDDDDDD") } bordered  title={this.props.noteObj.title} bordered={false} extra={<Tooltip title={this.props.noteObj.date}><Icon type="calendar" /></Tooltip>}
                hoverable='true' style={{  }}
                actions={[<Tooltip title="Add note">
                    <Icon type="plus" onClick={ () => {
                        // console.log('Add Clicked! : ', this.props.cardIndex)}
                        console.log("this : " ,this)
                        this.props.getClickedCard(this.props.noteObj._id)
                    }}
                        
                        />
                </Tooltip>, <Tooltip title="Delete note"><Icon type="delete" /></Tooltip>]}>
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