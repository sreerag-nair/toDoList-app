import React, { Component } from 'react';
import { Card, Icon, Tooltip } from 'antd';
const { Meta } = Card;


class DummyCardComponent extends Component{
    
    state = {
        
    }
    
    render(){
        return(
            <Card /*onClick = { () => this.props.getClickedCard(this.props.noteObj._id) }*/ bordered 
            hoverable style={{ textAlign : 'center' }}
            
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            
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
        
        
        <Meta
        title={this.props.noteObj.title} 
        
        avatar={<Tooltip title={<span>Created at  {this.props.noteObj.createdDate} 
        {(this.props.noteObj.updatedDate === 'Invalid Date') ? null :  (<span><br />Updated at {this.props.noteObj.updatedDate}</span>)  } </span>}>
        
        <Icon type="calendar" /></Tooltip>}
        
        />
        </Card>
    )
}
}


export default DummyCardComponent