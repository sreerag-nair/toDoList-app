import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import './CardComponent.css'



// THE TODO LIST CARD TEMPLATE.....

class CardComponent extends React.Component {
    state = {
        checked: true,
        disabled: false
        // ,checkBoxData: this.props.checkBoxData || ['Hello there is a damn idsfsdfs a checkbox under my mattress',
        //     'Hello there is a damn idsfsdfs a checkbox under my mattress',
        //     'Hello there is a damn idsfsdfs a checkbox under my mattress',
        //     'Hello there is a damn idsfsdfs a checkbox under my mattress',
        //     'Hello there is a damn idsfsdfs a checkbox under my mattress'
        // ]
    }

    onChange = (e) => {
        console.log(e)
        // e.target.checked  = !e.target.checked;
        // this.state.checked = !this.state.checked;
    }



    render() {

        
        return (

            <Card  key = { this.props.cardId } title={this.props.noteObj.title} bordered={false} extra={<Tooltip title={this.props.dateVar}><Icon type="calendar" /></Tooltip>}
                hoverable='true' style={{  }}
                actions={[<Tooltip title="Add note">
                    <Icon type="plus" onClick={ () => {
                        // console.log('Add Clicked! : ', this.props.cardIndex)}
                        console.log("this : " ,this)
                        this.props.getClickedCard(this.props.cardIndex)}
                        }
                        
                        />
                </Tooltip>, <Tooltip title="Delete note"><Icon type="delete" /></Tooltip>]}>
                <div>
                    {/* {console.log("noteObj : ", this.props.noteObj)} */}
                    {/* THE FIRST CHECKBOX ELEMENT REQUIRES A MARGINLEFT TO 8px STYLE TO ALIGN PROPERTY */}
                    <br />
                </div>
            </Card>
        );
    }
}


export default CardComponent;