import React from 'react';
import './DashBoard.css';
import { Icon, Layout, Menu, message } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import './DashBoard.css'
import ProfileComponent from './ProfileComponent';
import CardPopulatorDashBoardComponent from './CardPopulatorDashBoardComponent';
import AddNoteComponent from './AddNoteComponent';
const { Content, Sider, Footer } = Layout



class DashBoard extends React.Component {

    // componentWillMount(){

    //     axios.get('http://localhost:8001/dashboard',{},
    //     {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem('JWT_TOKEN')
    //         }
    //     }
    // )
    // .then((response) =>{
    //     if(response.status = 200){

    //         console.log("response data : ", response.data)
    //         this.setState({ userInfoFromDb : response.data })
    //     }
    // })
    // .catch((err) =>{
    //     if(err.response.status == 401){
    //         console.log("UNAUTHORIZED IN DASHBOARD!!")
    //         this.setState({ redirectVar : true })
    //     }
    // })

    // }

    loggingOutFunction() {
        message.success("Goodbye.... see you soon  :D")
        localStorage.removeItem('JWT_TOKEN')
        this.props.history.push('/login')
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

        return (

            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="0">
                            <Link to={'/dashboard/addnote'}>
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
                            <Link to={'/dashboard/profile'}>
                                <Icon type="profile" />
                                <span className="nav-text">Profile Info</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <div onClick={this.loggingOutFunction.bind(this)} >
                                <Icon type="logout" />
                                <span className="nav-text">Log out</span>
                            </div>
                        </Menu.Item>

                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>
                    <Content>
                        <Switch >
                            <Route exact path='/dashboard' render={(props) => <CardPopulatorDashBoardComponent {...props}/>} />
                            <Route exact path='/dashboard/addnote' render={(props) => <AddNoteComponent {...props}/>} />
                            <Route exact path='/dashboard/profile' render={(props) => <ProfileComponent {...props}/>} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', bottom : '0px' , width : '87%', position : " absolute" }}>
                        ---=== Created by SreeraG ===---
      </Footer>
                </Layout>

            </Layout>

        );
    }
}

export default DashBoard;
