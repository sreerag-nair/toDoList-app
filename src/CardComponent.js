import React, { Component } from 'react';
import { Card, Checkbox, Icon, Input, Tooltip } from 'antd';
import './CardComponent.css'



// THE TODO LIST CARD TEMPLATE.....

class CardComponent extends React.Component{
    state = {
        checked : true,
        disabled : false,
    }

    onChange = (e) =>{
            console.log(e)
            // e.target.checked  = !e.target.checked;
            // this.state.checked = !this.state.checked;
    }

    content = {
        label : 'Hello there is a damn idsfsdfs a checkbox under my mattress'
    }

    displayFunction = () =>{
        alert('MJ');
    }

    render(){

        
        return(

            <Card title="<< NOTE NAME HERE>>" bordered={false} extra= {<Tooltip title = {this.props.dateVar}><Icon type="calendar" /></Tooltip>}
             hoverable = 'true' style = {{ textAlign : 'center',}}
            actions = {[<Tooltip title = "Edit note"><Icon type="edit" onClick = {this.displayFunction} /></Tooltip>, <Tooltip title = "Delete note"><Icon type="delete" /></Tooltip>]}>
                <div style = {{ background : 'azure' }}>
                     <Checkbox onChange = { this.onChange } style = {{ textAlign : 'left',  }}>
                     {this.content.label}
                         {/* <Input placeholder = "Hello there" style = {{ border : 'none', border : 'transparent' }}/> */}
                     </Checkbox>
                     <Checkbox onChange = { this.onChange } style = {{ textAlign : 'left',  }}>
                        {this.content.label}
                         {/* <Input placeholder = "Hello there" style = {{ border : 'none', border : 'transparent' }}/> */}
                     </Checkbox>
                     <Checkbox onChange = { this.onChange } style = {{ textAlign : 'left', paddingLeft : '0' }}>
                        This is what is wrong witht the worldsdfsdfsdfg
                         {/* <Input placeholder = "Hello there" style = {{ border : 'none', border : 'transparent' }}/> */}
                     </Checkbox>
                     
               </div>

               <div style = {{ background : 'azure' }}>
                     <Checkbox onChange = { this.onChange } style = {{ textAlign : 'left' }}>
                     Hello there is a damn is a checkbox under my mattress
                     </Checkbox>
               </div>
            </Card>
        );
    }
}


export default CardComponent;