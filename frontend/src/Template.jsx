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
import CréerTest from './CréerTest';
import testFormulaire from './pages/testviaformulaire';
import { HighlightOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import TemplateHeader from "./components/TemlplateHeader";
import Entreprise from './gestionEntreprise';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


const Template = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [connected, setConnected] = useState(localStorage.getItem("userrole") || '3');
  const disabledStyle = { color: 'grey', cursor: 'not-allowed', pointerEvents: 'none' };
  const history = useHistory();

  useEffect(() => {
    setConnected(localStorage.getItem('userrole'));
  }, []);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  
  return (
    <Router>
       <Layout style={{ minHeight: '100vh' }}>
          {/* {(connected ==='0' || connected==='1') && <Redirect to="/Dashboard"/>}  */}
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#3987ee' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'  }}>
            <img src={logo1} alt="Logo" style={{ width: '50px', height: 'auto', margin: '20px' }} />
            <Link to="/" style={{ color: 'white', marginBottom: '20px', textDecoration: 'none' }}>Rec-inov</Link>
          </div>
          <Menu style={{ backgroundColor: '#3987ee'}} mode="inline" defaultSelectedKeys={['1']}>
          {connected !== '1' && (
            <Menu.Item key="1" icon={<HomeIcon    style={{ color: 'white' }} />} style={{ background: '#3987ee'  }}>
              <Link to="/dashboard" style={connected === '1' ? disabledStyle : { color: 'white', fontSize: '14px' }} >Tableau de Bord </Link>
           </Menu.Item> 
            )}
            {connected !== '1' && (
            <Menu.Item key="2" icon={<PersonIcon   style={{ color: 'white' }} />} style={{ background: '#3987ee'  }}>
              <Link to="/gest_utilisateur" style={connected === '1' ? disabledStyle : { color: 'white', fontSize: '14px' }}>Gestion utilisateur</Link>
            </Menu.Item> 
             )}
            <SubMenu
              icon={<HighlightOutlined style={{ color: 'white' }} />}
              title={<span style={{ color: 'white', fontSize: "13px" }}>Gestion de Questions</span>}
            >
              {connected !== '1' && (
                <Menu.Item
                  key="3"
                  icon={<FormatListBulletedIcon style={{ color: 'white' }} />}
                  style={{ background: '#3987ee', margin: 0, padding: 25 }}
                >
                  <Link to="/liste_question" style={connected === '1' ? disabledStyle : { color: 'white', fontSize: '14px', margin: 0, padding: '8px 16px' }}>
                    Liste Question
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item
                key="4"
                icon={<CreateIcon style={{ color: 'white' }} />}
                style={{ backgroundColor: '#3987ee', margin: 0, padding: 25 }}
              >
                <Link to="/AjoutQuestion" style={{ color: 'white', fontSize: "13px", margin: 0, padding: '8px 16px' }}>
                  Créer Question
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu  icon={<HighlightOutlined style={{ color: 'white' }} />} title={<span style={{ color: 'white', fontSize:"13px" }}>CréerTest</span>}>
            <Menu.Item key="4" icon={<CreateIcon  style={{ color: 'white' }} />} style={{backgroundColor: '#3987ee', margin: 0, padding: 25}} >
                <Link to="/creer_test" style={{ color: 'white', fontSize:"13px" }}> VIA BD </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<CreateIcon  style={{ color: 'white' }} />} style={{backgroundColor: '#3987ee', margin: 0, padding: 25}} >
                <Link to="/test_formulaire" style={{ color: 'white', fontSize:"13px" }}> via formulaire</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<PersonIcon   style={{ color: 'white' }} />} style={{ background: '#3987ee'  }}>
              <Link to="/gestionEntreprise" style={{ color: 'white', fontSize:"14px" }}>Gestion Entreprise</Link>
            </Menu.Item> 

          </Menu>
          <Button className="btn" onClick={handleCollapse} style={{ border: "none", backgroundColor: "#1271ec" }}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </Sider>
        <Layout className="site-layout">
          <TemplateHeader />
         


          <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280,  }}>
          {/* {connected == '1' && ( */}
              {/* <> */}
                <PrivateRoute path="/gest_utilisateur"   style={{ background: '#3987ee' }} component={Gest} allowedRoles={['0']} userRole={connected}  />
                <PrivateRoute path="/AjoutQuestion" style={{ background: '#3987ee' }} component={AjoutQuestion} allowedRoles={['0']} userRole={connected} />
                <PrivateRoute path="/liste_question" style={{ background: '#3987ee' }} component={ListeQuest} allowedRoles={['0']} userRole={connected} />
              {/* </> */}
            {/* )} */}
              <Route path="/ModifierQuestion/:id" style={{ background: '#3987ee' }} component={Question} />
              <Route path="/filtrer_Question" style={{ background: '#3987ee' }} component={Filter} />
              <Route path="/traduire_quest" component={TraduireQuest} />
              <Route path="/dashboard"  style={{ background: '#3987ee' }} component={Dashboard} />
              <Route path="/creer_test"  style={{ background: '#3987ee' }} component={CréerTest} />
              <Route path="/test_formulaire"  style={{ background: '#3987ee' }} component={testFormulaire} />
              <Route path="/gestionEntreprise"  style={{ background: '#3987ee' }} component={Entreprise} />
          </Content>
        </Layout>
      </Layout> 


   

    </Router>
  );
};

export default Template;
