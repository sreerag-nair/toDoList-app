import React, { Component } from 'react';
import { Button, Layout, Modal } from 'antd';



class CardEditingModalComponent extends Component {

    componentDidMount(){
        this.setState({ visible : true , currCard : this.props.component })
        // this.setState({  })
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
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>...................some content</p>
                        {/* <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p>
                        <p>...................some content</p> */}
                        {this.state.component}
                    </Modal>
                </Layout>


            )
        }
    }

    export default CardEditingModalComponent;