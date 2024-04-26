import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  UserOutlined,
  HighlightOutlined,
  PlusCircleOutlined ,
  BarsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
  DownOutlined
} from '@ant-design/icons';
import Gest from './pages/gest_utilisateur';
import AjoutQuestion from './AjoutQuestion';
import "antd/dist/antd.min.css";
import logo1 from '../src/media/logo1.png';
import Question from './pages/ModifierQuestion';
import Filter from './pages/filtrer_Question';
import TraduireQuest from './TraduireQuest';
import ListeQuest from './ListeQuest';
import PrivateRoute from './pages/privetroute';
import Dashboard from './pages/Dashboard';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home' ; 
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';

const Template = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({ name: 'Visiteur' });
  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
//changer par Auth user
const [connected, setConnected] = useState(localStorage.getItem("userrole")?localStorage.getItem("userrole"):'3')

useEffect(() => {

  setConnected(localStorage.getItem('userrole'))
  console.log('connected',connected)
}, [connected]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.clear(); // Effacer toutes les données du localStorage
    fetch('http://localhost:3002/api/signout', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => {
        if (response.ok) {
            // Redirection vers la page de connexion
            history.push('/login'); // Utilisation de history pour la redirection
        } else {
            console.error('Erreur lors de la déconnexion:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la déconnexion :', error);
    });
};
const handlename= () => {
  fetch('http://localhost:3002/api/name', {
      method: 'GET',
      credentials: 'include',
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
  })
  .then(data => {
      // Afficher le nom de l'utilisateur récupéré dans votre interface utilisateur
      console.log('Nom de l\'utilisateur:', data.name);
  })
  .catch(error => {
      console.error('Erreur:', error.message);
  });
};
// Appelez cette fonction pour récupérer les informations de l'utilisateur une fois que l'utilisateur est connecté
handlename();
  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile" style={{ color: '#000000' }}>Mon profil</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout} style={{ color: '#000000' }}>Déconnexion</Menu.Item>
    </Menu>
  );
console.log("connected",connected)
  return (
    <Layout style={{ minHeight: '100vh'  }}>
      {(connected ==='0' || connected==='1') && <Redirect to="/Dashboard"/>}
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#3987ee' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'  }}>
            <img src={logo1} alt="Logo" style={{ width: '50px', height: 'auto', margin: '20px' }} />
            <Link to="/" style={{ color: 'white', marginBottom: '20px', textDecoration: 'none' }}>Rec-inov</Link>
          </div>
          <Menu style={{ backgroundColor: '#3987ee'}} mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeIcon    style={{ color: 'white' }} />} style={{ background: '#3987ee'  }}>
              <Link to="/dashboard" style={{ color: 'white', fontSize:"14px" }}>Tableau de Bord </Link>
            </Menu.Item> 
            <Menu.Item key="2" icon={<PersonIcon   style={{ color: 'white' }} />} style={{ background: '#3987ee'  }}>
              <Link to="/gest_utilisateur" style={{ color: 'white', fontSize:"14px" }}>Gestion utilisateur</Link>
            </Menu.Item> 
            <SubMenu  icon={<HighlightOutlined style={{ color: 'white' }} />} title={<span style={{ color: 'white', fontSize:"13px" }}>Gestion de Questions</span>}>
            <Menu.Item key="3" icon={<FormatListBulletedIcon  style={{ color: 'white' }} />} style={{ background: '#3987ee' }} >
                <Link to="/liste_question" style={{ color: 'white', backgroundColor: '#3987ee' , fontSize:"13px"}}> Liste Question </Link>
                </Menu.Item>  
              <Menu.Item key="4" icon={<CreateIcon  style={{ color: 'white' }} />} style={{backgroundColor: '#3987ee'}} >
                <Link to="/ajouter_question" style={{ color: 'white', fontSize:"13px" }}> Créer Question</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Button className="btn" onClick={handleCollapse} style={{ border: "none", backgroundColor: "#1271ec" }}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, background: '#3987ee' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Link to="#" className='ant-dropdown-link' onClick={e => e.preventDefault()} style={{ color: 'white', marginLeft: '88%', cursor: 'pointer', textDecoration: 'none' }}>
                {user.name} <DownOutlined />
              </Link>
            </Dropdown>
          </Header>
          <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280,  }}>
           <PrivateRoute path="/gest_utilisateur" style={{ background: '#3987ee' }} component={Gest} allowedRoles={['0']} userRole={connected} />
              <Route path="/ModifierQuestion" style={{ background: '#3987ee' }} component={Question} />
              <Route path="/filtrer_Question" style={{ background: '#3987ee' }} component={Filter} />
              <Route path="/ajouter_question" style={{ background: '#3987ee'}} component={AjoutQuestion} />
              <Route path="/traduire_quest" component={TraduireQuest} />
              <Route path="/liste_question"  style={{ background: '#3987ee' }} component={ListeQuest} />
              <Route path="/dashboard"  style={{ background: '#3987ee' }} component={Dashboard} />
          </Content>
        </Layout>
      </Layout>
  );
};
export default Template; 