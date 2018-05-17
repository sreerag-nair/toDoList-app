import React, { Component } from 'react';
import { Button, Layout, Modal } from 'antd';



class CardEditingModalComponent extends Component {

    componentDidMount(){
        this.setState({ visible : true , currCard : this.props.component })
        // console.log("PROPS:  " , this.props)
    }

    state = { visible: false,
             currCard : null}

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    
    showModal = () => {
        this.setState({
            visible: this.props.show,
        });
        console.log("Inside showModal")
    }


        render(){
            return (

                <Layout>
                    <h1>MODAL COMPONENT</h1>

                    <Modal
                        title="Edit Card"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        confirmLoading = {true}
                    >
                    
                        
                    </Modal>
                </Layout>


            )
        }
    }

    export default CardEditingModalComponent;