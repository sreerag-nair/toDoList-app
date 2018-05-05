import React, { Component } from 'react';
import { Card, Checkbox, Icon, Tooltip } from 'antd';
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

    render(){

        
        return(
            <Card title="<<Note Name>>" bordered = 'false' extra= {<Tooltip title = {this.props.message}><Icon type="calendar" /></Tooltip>} hoverable = {'true'} style = {{ width : 300 , display : 'table',
             textAlign : 'center', margin : '0 auto',
              paddingTop : '200' }}>
              
              <div style = {{ background : 'azure' }}>
                    <Checkbox onChange = { this.onChange } style = {{ textAlign : 'left' }}>
                        {this.content.label}
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