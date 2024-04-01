import React from 'react';
import { Card, Typography, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
    return (
        <Card style={{ margin: 30, padding: 30 }}>
            <Title level={4}>Bienvenue sur le Dashboard</Title>
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="example-select">Choisissez une option :</label>
                <Select id="example-select" defaultValue="option1" style={{ width: 200 }}>
                    <Option value="option1">Option 1</Option>
                    <Option value="option2">Option 2</Option>
                    <Option value="option3">Option 3</Option>
                </Select>
            </div>
        </Card>
    );
};

export default Dashboard;