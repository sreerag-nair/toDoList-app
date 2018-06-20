import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { message } from 'antd';

const axios = require('axios');

var dotGenerator;
var counter = 0;

class RedirectComponent extends Component {

    state = {
        code: '',
        dots: '',
        message: 'Redirecting to dashboard'
    }

    componentWillMount() {
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1]
        this.setState({ code: code })

    }


    componentDidMount() {

        dotGenerator = setInterval(() => {

            if (!(counter % 3))
                this.setState({
                    message: "Redirecting to dashboard"
                })

            var update = this.state.message + '.'

            ++counter;
            this.setState({
                message: update
            })

        }, 1000)

        // console.log("sending code : ", this.state.code)
        axios.get('http://localhost:8001/authenticate?code=' + this.state.code)
            .then((response) => {
                console.log("RESPONSE IN REDIRECT: ", response)

                //push in the token
                //existing user
                if (response.status == 200) {
                    localStorage.setItem('JWT_TOKEN', (response.data.token));
                    console.log("Saved in localStorage ");
                    this.props.history.push('/dashboard')
                    message.success(response.data.message)

                }
                else{
                    localStorage.setItem('JWT_TOKEN', (response.data.token));
                    console.log("Saved in localStorage ");
                    this.props.history.push('/dashboard')
                    message.success(response.data.message)
                }

            })
            .catch((err) => {
                //NETWORK ERROR HAS BEEN HANDLED CORRECTLY......
                if(err.response){
                    if(err.response.status){
                        message.error(err.response.data.error)
                        this.props.history.push('/')
                    }
                }
                else{
                    message.error('Some network error occured....')
                    this.props.history.push('/')
                }
            })
    }

    componentWillUnmount() {
        clearInterval(dotGenerator)
    }


    render() {
        return (
            <h1>{this.state.message}</h1>
        )
    }
}


export default RedirectComponent;


/* 

...MY TIMER EXAMPLE...

http://jsbin.com/disobileru/edit?html,js,console,output


*/