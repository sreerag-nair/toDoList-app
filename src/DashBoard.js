import React, { Component } from 'react';
import './DashBoard.css';
import { Button, Col, Icon, Layout, Menu, Modal, Row } from 'antd';
import CardComponent from './CardComponent';
import { Link, Switch, Route } from 'react-router-dom';
import './DashBoard.css'
import axios from 'axios';
import CardEditingModalComponent from './CardEditingModalComponent';
import ProfileComponent from './ProfileComponent';
import CardPopulatorDashBoardComponent from './CardPopulatorDashBoardComponent';
const { Content, Sider, Footer } = Layout



class DashBoard extends React.Component {

    loggingOutFunction = () => {
        console.log("Logging out function");
    }


    state = {
        loading: false,
        visible: false,
        showModal: false,
        currentCard: null
    }

    setCurrentCard = (thisValue) => {

        this.setState({ currentCard: thisValue })
        this.setState({ showModal: true });
        console.log('thisVal : ', this.state);

    }

    render() {

        const { loading, visible } = this.state

        return (

            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="0">
                            <Link to={'/addnote'}>
                                <Icon type="plus" />
                                <span className="nav-text">Add</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to={'/dashboard'}>
                                <Icon type="dashboard" />
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" >
                            <Link to={'/profile'}>
                                <Icon type="profile" />
                                <span className="nav-text">Profile Info</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={'/logout'}>
                                {/* <div onClick={ () => this.loggingOutFunction() }> */}
                                <Icon type="logout" />
                                <span className="nav-text">Log out</span>
                                {/* </div> */}
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>


                <Layout style={{ marginLeft: 200 }}>
                    <Switch >
                        <Route exact path='/dashboard' render={() => <CardPopulatorDashBoardComponent />} />
                        <Route exact path='/add-card' render={() => <CardComponent />} />
                        <Route exact path='/profile' component={ProfileComponent} />
                    </Switch>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Copied by SreeraG
      </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default DashBoard;