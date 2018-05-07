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
          <Layout style={{ height: '100vh' }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                  <Icon type="dashboard" />
                  <span>Dashboard</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="profile" />
                  <span>Profile Pic</span>
                </Menu.Item>
                <Menu.Item key="9">
                  <Icon type="logout" />
                  <span>Logout</span>
                </Menu.Item>
              </Menu>
            </Sider>


            
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} >
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  Bill is a cat.
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
                </div>
                </Header>
                
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        );
      }
}

export default DashBoard;