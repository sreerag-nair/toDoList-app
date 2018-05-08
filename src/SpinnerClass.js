import React from 'react';
import { Icon, Spin } from 'antd';




class SpinnerClass extends React.Component{
    render(){
        return(
            <Icon type="loading" style={{ fontSize: 24 }} spin />
        )
    }
}



export default SpinnerClass;