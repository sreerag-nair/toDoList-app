import React, { Component } from 'react';
import { Card, Checkbox, Icon, Tooltip } from 'antd';
import './CardComponent.css'



// THE TODO LIST CARD TEMPLATE.....

class CardComponent extends React.Component {
    state = {
        checked: true,
        disabled: false,
        checkBoxData: this.props.checkBoxData ||  ['Hello there is a damn idsfsdfs a checkbox under my mattress',
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

            <Card title="<< NOTE NAME HERE>>" bordered={false} extra={<Tooltip title={this.props.dateVar}><Icon type="calendar" /></Tooltip>}
                hoverable='true' style={{ textAlign: 'center', }}
                actions={[<Tooltip title="Add note">
                <Icon type="plus"  onClick={
                    () => {
                        console.log('ICON');
                        this.props.cardToPopulate(this.state.checkBoxData)
                        
                    }
                }/>
                </Tooltip> , <Tooltip title="Delete note"><Icon type="delete" /></Tooltip>]}>
                <div>

                    {/* THE FIRST CHECKBOX ELEMENT REQUIRES A MARGINLEFT TO 8px STYLE TO ALIGN PROPERTY */}

                    {this.state.checkBoxData.map((e, index) => {

                        if (index == 0) {
                            return (
                                <Checkbox key={index} onChange={this.onChange} style={{ textAlign: 'left', marginLeft : '8px'}}>
                                    {e}
                                </Checkbox>
                            )
                        }
                        else {
                            return (
                                <Checkbox key={index} onChange={this.onChange} style={{ textAlign: 'left', }}>
                                    {e}
                                </Checkbox>
                            )
                        }

                    })}



                </div>
            </Card>
        );
    }
}


export default CardComponent;