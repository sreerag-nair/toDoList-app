import React, { Component } from 'react';
import { Card, Checkbox } from 'antd';
import './CardComponent.css'


class CardComponent extends React.Component{
    state = {
        checked : true,
        disabled : false,
    }

    onChange = (e) =>{
            console.log(this.state.checked)
            this.state.checked = !this.state.checked;
    }

    render(){
        return(
            <Card title="<<Note Name>>" hoverable = {'true'} style = {{ width : 300 , display : 'table',
             textAlign : 'center', margin : '0 auto',
              paddingTop : '200' }}>
              
              <div>
                    <Checkbox checked = {this.state.checked} onChange = { this.onChange }></Checkbox>
              </div>

              </Card>
        );
    }
}


export default CardComponent;