import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
  DownOutlined
} from '@ant-design/icons';
import Gest from './pages/gest_utilisateur';
import "antd/dist/antd.min.css";
import logo1 from '../src/media/logo1.png';
import './App.css';
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({ name: 'nom utilisateur' });

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'gestion utilisateur',
      to: '/gest_utilisateur',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Nav 2',
      to: '/page2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Nav 3',
      to: '/',
    },
  ].map(item => ({
    ...item,
    label: <Link to={item.to}>{item.label}</Link>,
  }));

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Mon profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => setUser({ name: "Visiteur" })}>Déconnexion</Menu.Item>
    </Menu>
  );

  
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}
          style={{ background: '#379DD0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={logo1} alt="Logo" style={{ width: '50px', height: 'auto', margin: '20px' }} />
            <Link to="/app" style={{ color: 'white', marginBottom: '20px' }}>Rec-inov</Link>
          </div>
          <Menu  style={{ background: '#379DD0' }} mode="inline" defaultSelectedKeys={['1']} items={items} />
          <Button className="btn" onClick={handleCollapse} style={{ border: 'none' }}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, background: '#379DD0' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <Dropdown overlay={userMenu}>
              <a className='ant-dropdown-link' onClick={e => e.preventDefault()} style={{ color:'white',marginLeft:'88%' }}>
                {user.name} <DownOutlined />
              </a>
            </Dropdown>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '#fff'
            }}>
            <Switch>
              <Route path="/gest_utilisateur" component={Gest} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;