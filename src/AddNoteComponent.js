import React, { Component } from 'react';
import { Card, Checkbox, Divider, Input } from 'antd';

class AddNoteComponent extends Component {
    render() {
        return (
            <Card style={{ width: '30vw', height: '90vh', background: 'olive' }}>
                <Divider />
                <Checkbox >
                    <Input placeholder="Insert text here" />
                </Checkbox>
                <Divider />
                <Checkbox >
                    <Input placeholder="Insert text here" />
                </Checkbox>
                <Divider />
                <Checkbox >
                    <Input placeholder="Insert text here" />
                </Checkbox>
                <Divider />
                <Checkbox >
                    <Input placeholder="Insert text here" />
                </Checkbox>
                <Divider />
                <Checkbox >
                    <Input placeholder="Insert text here" />
                </Checkbox>
                <Divider />
            </Card>
        )
    }
}

export default AddNoteComponent;