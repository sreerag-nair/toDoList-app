import React, { Component } from 'react';
import './DashBoard.css';
import { Button, Col, Icon, Layout, Menu, Row } from 'antd';

const { Sider } = Layout
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class DashBoard extends React.Component{



    render(){
        return(
            <Menu mode = "horizontal" theme = "dark">

                     <Menu.Item key="add:bttn">
                        <Icon type="plus-circle-o" />
                    </Menu.Item> 

                    <SubMenu title={<span><Icon type="profile" />//USERNAME COMES HERE//</span>}>
                        <Menu.Item key="navbar:1"><a href = "http://www.google.com"><span><Icon type = "dashboard" /></span>Dash Board</a></Menu.Item>
                        <Menu.Item key="navbar:2"><a href = "http://www.google.com"><span><Icon type = "profile" /></span>Profile Info</a></Menu.Item>
                        <Menu.Item key="navbar:3"><a href = "http://www.google.com"><span><Icon type = "logout" /></span>Log Out</a></Menu.Item>
                    </SubMenu>      
            </Menu>        
        );
    }
}

export default DashBoard;