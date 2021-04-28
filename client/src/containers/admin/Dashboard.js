import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './dashboard.scss';
import Tested from './Tested';
import Test from './Test';
import Rendering from './Rendering';

const { Header, Sider, Content } = Layout;
const Dashboard = ({ history }) => {
    
    // useEffect(() => {
    //     if (!adminer.isAuthenticated) {
    //        history.push("/admin/login");
    //     }
    //  }, []);
    
    const [collapsed, setCollapsed] = useState(false);
    let { path, url } = useRouteMatch();

    const toggle = () => {
      console.log(path);
        setCollapsed(!collapsed);
    }


    
    return (  
      <Router>
        <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}       
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
        }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={`${url}/rendering`}>Test 1</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to={`${url}/test`}>Test</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to={`${url}/tested`}>Tested</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 100
            }}
          >
            <Switch>
               <Route path={`${path}/rendering`} exact component={Rendering} />
               <Route path={`${path}/test`} exact component={Test} />
               <Route path={`${path}/tested`} exact component={Tested} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
 };
 

 export default Dashboard;
 