import React, { Component } from 'react';
import './DashBoard.css';
import { Button, Col, Icon, Layout, Menu, Modal, Row } from 'antd';
import CardComponent from './CardComponent';
import { Link } from 'react-router-dom';
import './DashBoard.css'
import axios from 'axios';
const { Content, Sider, Footer } = Layout



class DashBoard extends React.Component {

    loggingOutFunction = () => {
        console.log("Logging out function");
    }

    state = {
        loading: false,
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });

    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }


    render() {

        const { loading, visible } = this.state

        return (

            <Layout>

                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
            </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>






                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="dashboard" />
                            <span className="nav-text">Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="profile" />
                            <span className="nav-text">Profile Info</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            {/* <div onClick={ () => this.loggingOutFunction() }> */}
                            <Icon type="logout" />
                            <span className="nav-text">Log out</span>
                            {/* </div> */}
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent dateVar={new Date().toString()} showModal={this.showModal.bind(this)} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent dateVar={new Date().toString()} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent dateVar={new Date().toString()} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                </Col>
                                <Col span={8}>
                                    <CardComponent />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
      </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default DashBoard;