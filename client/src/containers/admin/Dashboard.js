import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import { setCurrentAdmin, logoutAdmin } from "../../actions/adminAction";
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './dashboard.scss';
import { connect } from "react-redux";
import Tested from './Tested';
import ListAdmin from './ListAdmin';
import CustomerTable from './customer/CustomerTable';
import CustomerUpdate from './customer/CustomerUpdate';

const { Header, Sider, Content } = Layout;

const Dashboard = ({ adminer, history, setCurrentAdmin, logoutAdmin }) => {
  
    // useEffect(() => {
    //     if (!adminer.isAuthenticated) {
    //        history.push("/admin/login");
    //     }
    //  }, [adminer.isAuthenticated, history]);
    
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
              <Link to={`${url}/list-admin`}>List Admin</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to={`${url}/customer`}>Customer</Link>
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
               <Route path={`${path}/list-admin`} exact component={ListAdmin} />
               <Route path={`${path}/customer/update/:id`} exact component={CustomerUpdate} />
               <Route path={`${path}/customer`} exact component={CustomerTable} />
               <Route path={`${path}/tested`} exact component={Tested} />
               <Redirect from="*" to="/admin/dashboard" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
 };
 
const mapStateToProps = state => ({
  adminer: state.adminer
});

export default connect(
  mapStateToProps,
  {setCurrentAdmin, logoutAdmin}
)(Dashboard);
 