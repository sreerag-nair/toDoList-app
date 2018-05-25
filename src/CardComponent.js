import React, { Component } from 'react';
import { Card, Checkbox, Icon, Tooltip } from 'antd';
import './CardComponent.css'



// THE TODO LIST CARD TEMPLATE.....

class CardComponent extends React.Component {
    state = {
        checked: true,
        disabled: false,
        checkBoxData: this.props.checkBoxData || ['Hello there is a damn idsfsdfs a checkbox under my mattress',
            'Hello there is a damn idsfsdfs a checkbox under my mattress',
            'Hello there is a damn idsfsdfs a checkbox under my mattress',
            'Hello there is a damn idsfsdfs a checkbox under my mattress',
            'Hello there is a damn idsfsdfs a checkbox under my mattress'
        ]
    }

    onChange = (e) => {
        console.log(e)
        // e.target.checked  = !e.target.checked;
        // this.state.checked = !this.state.checked;
    }



    render() {

        
        return (

            <Card title={this.props.noteObj.title} bordered={false} extra={<Tooltip title={this.props.dateVar}><Icon type="calendar" /></Tooltip>}
                hoverable='true' style={{  }}
                actions={[<Tooltip title="Add note">
                    <Icon type="plus" onClick={ () => alert('Add Clicked!') } />
                </Tooltip>, <Tooltip title="Delete note"><Icon type="delete" /></Tooltip>]}>
                <div>
                    {console.log("noteObj : ", this.props.noteObj)}
                    {/* THE FIRST CHECKBOX ELEMENT REQUIRES A MARGINLEFT TO 8px STYLE TO ALIGN PROPERTY */}

                    {this.props.noteObj.list.map((e, index) => {

                            return (
                                <div key = {index}>
                                    <Checkbox onChange={this.onChange} style={{ textAlign: 'left' }}>
                                        {e.content}
                                    </Checkbox>
                                </div>
                            )
                    })}
                </div>
            </Card>
        );
    }
}


export default CardComponent;