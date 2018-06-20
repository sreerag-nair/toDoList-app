import React, { Component } from 'react';
import './GitHubComponent.css';
import { Card } from 'antd';

class GitHubComponent extends React.Component{

        constructor(props){
            super(props);
            
        }
        componentDidMount(){
            this.props.changeProfilePicToGitCat()
        }

        render(){
            // this.props.cn();
         
            return(
                <h1>GitHUb Component goes here</h1>
                
                

            );
        }
}

export default GitHubComponent;