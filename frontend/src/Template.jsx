import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
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
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
<<<<<<< HEAD
import { HighlightOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import TemplateHeader from "./components/TemlplateHeader";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
=======
import CréerTest from './CréerTest';
import testFormulaire from './pages/testviaformulaire';

>>>>>>> 0c9ab8c139b4b40ffdcd9777a3ebcb14f485a9e4

const Template = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [connected, setConnected] = useState(localStorage.getItem("userrole") || '3');

  const history = useHistory();
<<<<<<< HEAD
=======
  const [userName, setUserName] = useState('');
//changer par Auth user
const [connected, setConnected] = useState(localStorage.getItem("userrole")?localStorage.getItem("userrole"):'3')
>>>>>>> 0c9ab8c139b4b40ffdcd9777a3ebcb14f485a9e4

  useEffect(() => {
    setConnected(localStorage.getItem('userrole'));
  }, []);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
<<<<<<< HEAD
    localStorage.clear();
    fetch('http://localhost:3002/api/signout', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          history.push('/login');
        } else {
          console.error('Error logging out:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

=======
      localStorage.clear();
      history.push('/login'); 
  };
//   useEffect(() => {
//     // Récupérer le token JWT depuis localStorage
//     const token = localStorage.getItem('token');

//     // Si le token existe, faire une requête au backend pour obtenir les informations de l'utilisateur
//     if (token) {
//         fetch('http://localhost:3002/api/name', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.name) {
//                 setUserName(data.name);
//             } else {
//                 // Gérer les erreurs, par exemple si le token est invalide
//                 console.error('Erreur lors de la récupération du nom de l\'utilisateur');
//             }
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération du nom de l\'utilisateur :', error);
//         });
//     }
// }, []);
// const handlename= () => {
//   fetch('http://localhost:3002/api/name', {
//       method: 'GET',
//       credentials: 'include',
//   })
//   .then(response => {
//       if (response.ok) {
//           return response.json();
//       } else {
//           throw new Error('Erreur lors de la récupération des informations de l\'utilisateur');
//       }
//   })
//   .then(data => {
//       // Afficher le nom de l'utilisateur récupéré dans votre interface utilisateur
//       console.log('Nom de l\'utilisateur:', data.name);
//   })
//   .catch(error => {
//       console.error('Erreur:', error.message);
//   });
// };

// Appelez cette fonction pour récupérer les informations de l'utilisateur une fois que l'utilisateur est connecté
// handlename();
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
>>>>>>> 0c9ab8c139b4b40ffdcd9777a3ebcb14f485a9e4
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
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
            <SubMenu  icon={<HighlightOutlined style={{ color: 'white' }} />} title={<span style={{ color: 'white', fontSize:"13px" }}>CréerTest</span>}>
            <Menu.Item key="4" icon={<CreateIcon  style={{ color: 'white' }} />} style={{backgroundColor: '#3987ee'}} >
                <Link to="/creer_test" style={{ color: 'white', fontSize:"13px" }}> VIA BD </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<CreateIcon  style={{ color: 'white' }} />} style={{backgroundColor: '#3987ee'}} >
                <Link to="/test_formulaire" style={{ color: 'white', fontSize:"13px" }}> via formulaire</Link>
              </Menu.Item>
            </SubMenu>



            

          </Menu>
          <Button className="btn" onClick={handleCollapse} style={{ border: "none", backgroundColor: "#1271ec" }}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </Sider>
        <Layout className="site-layout">
<<<<<<< HEAD
          <TemplateHeader />
          <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280,  }}>
            <PrivateRoute path="/gest_utilisateur" style={{ background: '#3987ee' }} component={Gest} allowedRoles={['0']} userRole={connected} />
            <Route path="/ajouter_question" style={{ background: '#3987ee' }} component={AjoutQuestion} />
            <Route path="/ModifierQuestion/:id" style={{ background: '#3987ee' }} component={Question} />
            <Route path="/filtrer_Question" style={{ background: '#3987ee' }} component={Filter} />
            <Route path="/traduire_quest" component={TraduireQuest} />
            <Route path="/liste_question"  style={{ background: '#3987ee' }} component={ListeQuest} />
            <Route path="/dashboard"  style={{ background: '#3987ee' }} component={Dashboard} />
=======
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
              <Route path="/ajouter_question" style={{ background: '#3987ee' }} component={AjoutQuestion} />
              <Route path="/ModifierQuestion/:id" style={{ background: '#3987ee' }} component={Question} />
              <Route path="/filtrer_Question" style={{ background: '#3987ee' }} component={Filter} />
              <Route path="/traduire_quest" component={TraduireQuest} />
              <Route path="/liste_question"  style={{ background: '#3987ee' }} component={ListeQuest} />
              <Route path="/dashboard"  style={{ background: '#3987ee' }} component={Dashboard} />
              <Route path="/creer_test"  style={{ background: '#3987ee' }} component={CréerTest} />
              <Route path="/test_formulaire"  style={{ background: '#3987ee' }} component={testFormulaire} />
>>>>>>> 0c9ab8c139b4b40ffdcd9777a3ebcb14f485a9e4
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Template;
