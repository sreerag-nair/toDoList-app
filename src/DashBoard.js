import React, { Component } from 'react';
import './DashBoard.css';
import { Breadcrumb, Button, Card, Col, Icon ,Layout, Menu, Row } from 'antd';
import CardComponent from './CardComponent';
import './DashBoard.css'
const { Content, Header, Sider, Footer } = Layout
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class DashBoard extends React.Component{

    state = {
        collapsed: false,
      };
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
      render() {
        return (
          <Layout>
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
          <Icon type="logout" />
          <span className="nav-text">Log out</span>
        </Menu.Item>
        
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
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
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
        );
      }
}

export default DashBoard;