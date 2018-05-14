import React, { Component } from 'react';
import './DashBoard.css';
import { Button, Col, Icon, Layout, Menu, Modal, Row } from 'antd';
import CardComponent from './CardComponent';
import { Link } from 'react-router-dom';
import './DashBoard.css'
import axios from 'axios';
import CardEditingModalComponent from './CardEditingModalComponent';
import ProfileComponent from './ProfileComponent';
const { Content, Sider, Footer } = Layout



class DashBoard extends React.Component {

    loggingOutFunction = () => {
        console.log("Logging out function");
    }


    state = {
        loading: false,
        visible: false,
        showModal : false,
        currentCard : null
    }    

    setCurrentCard = (thisValue) =>{

        this.setState({ currentCard : thisValue })
        this.setState({showModal : true});
        console.log('thisVal : ' , this.state);
        
    }

    render() {

        const { loading, visible } = this.state

        return (

            <Layout>
                
                {/* {  <CardEditingModalComponent component = {this.state.currentCard} show = { this.state.showModal }/>   } */}
                
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                        <Link to = {'/dashboard'}>
                            <Icon type="dashboard" />
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="2" >
                        <Link to = {'/profile'}>
                            <Icon type="profile" />
                            <span className="nav-text">Profile Info</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Link to = {'/logout'}>
                            {/* <div onClick={ () => this.loggingOutFunction() }> */}
                            <Icon type="logout" />
                            <span className="nav-text">Log out</span>
                            {/* </div> */}
                        </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} dateVar={new Date().toString()} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard}/>
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard}/>
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard}/>
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard}  dateVar={new Date().toString()} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard}  />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                    {/* <Card title="Card title" bordered={false}>Card content</Card> */}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard}  dateVar={new Date().toString()} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
                                </Col>
                                <Col span={8}>
                                    <CardComponent setCurrentCard = {this.setCurrentCard} />
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