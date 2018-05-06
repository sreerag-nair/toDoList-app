import React, { Component } from 'react';
import './DashBoard.css';
import { Button, Card, Col, Icon, Layout, Menu, Row } from 'antd';
import CardComponent from './CardComponent';
const { Content, Header, Sider } = Layout
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class DashBoard extends React.Component{



    render(){
        return(

            <div>
                <Layout style = {{ height : '100vh'}}>
                {/* HEADER STARTS HERE */}
                    <Header>
                        <Menu mode = "horizontal"  theme = "dark">
                            <Menu.Item key="add:bttn">
                                <Icon type="plus-circle-o" />
                            </Menu.Item> 

                            <SubMenu title={<span><Icon type="profile" />//USERNAME COMES HERE//</span>}>
                                <Menu.Item key="navbar:1"><a href = "http://www.google.com"><span><Icon type = "dashboard" /></span>Dash Board</a></Menu.Item>
                                <Menu.Item key="navbar:2"><a href = "http://www.google.com"><span><Icon type = "profile" /></span>Profile Info</a></Menu.Item>
                                <Menu.Item key="navbar:3"><a href = "http://www.google.com"><span><Icon type = "logout" /></span>Log Out</a></Menu.Item>
                            </SubMenu>      
                        </Menu>
                    </Header>
                    {/* HEADER ENDS HERE */}
                    <Layout>
                        <Sider></Sider>
                        <Content>
                            

                            <div style={{ background: '#ECECEC', padding: '30px' }}>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <CardComponent dateVar = {new Date().toString()} />
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
                        <Sider></Sider>
                    </Layout>
                </Layout>
            </div>

           
        );
    }
}

export default DashBoard;