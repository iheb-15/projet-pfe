import React, { useState } from "react";
import { BellFilled, MailOutlined, DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space, Typography, Dropdown, Menu } from "antd";
// import { Link } from 'react-router-dom';
import logo3 from '../components/logo3.png';
// import { useHistory } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Assuming you have a state for collapsed

  
  const userIcon = <UserOutlined style={{ fontSize: 16 }} />;
  const history = useHistory();
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
};

const userMenu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/profile" style={{ color: '#000000' }}>Mon profil</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" onClick={handleLogout} style={{ color: '#000000' }}>Déconnexion</Menu.Item>
  </Menu>
);

  return (
    
    <div className="AppHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      <div>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </div>

      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 16, color: "white", marginRight: 10 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 16, color: "white", marginRight: 10 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
        <Badge>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Link to="#" className='ant-dropdown-link' onClick={e => e.preventDefault()} style={{ color: 'white', cursor: 'pointer', textDecoration: 'none' }}>
              {userIcon} <DownOutlined />
            </Link>
          </Dropdown>
        </Badge>
      </Space>

      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}

export default AppHeader;
