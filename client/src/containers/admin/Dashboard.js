import React, { useState, useEffect } from "react";
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import { setCurrentAdmin, logoutAdmin } from "../../actions/adminAction";
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LineChartOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  LeftCircleOutlined
} from '@ant-design/icons';
import './dashboard.scss';
import jwt_decode from "jwt-decode";
import store from "../../store";
import { connect } from "react-redux";
import ListAdmin from './ListAdmin';
import CustomerTable from './customer/CustomerTable';
import CustomerUpdate from './customer/CustomerUpdate';
import ProductTable from "./product/ProductTable";
import ProductCreate from "./product/ProductCreate";
import ProductUpdate from "./product/ProductUpdate";
import CateTable from "./category/CateTable";
import CateCreate from './category/CateCreate';
import CateUpdate from './category/CateUpdate';
import ReviewTable from './review/ReviewTable';
import OrderTable from './order/OrderTable';
import adminToken from './../../utils/adminToken';
import BlogTable from './blog/BlogTable';
import BlogCreate from './blog/BlogCreate';
import BlogUpdate from './blog/BlogUpdate';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

if (typeof localStorage.adminToken !== "undefined") {
  const token = localStorage.adminToken;
  adminToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentAdmin(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
      store.dispatch(logoutAdmin());
  }
}
const Dashboard = ({ adminer, history, setCurrentAdmin, isAuthenticated, logoutAdmin }) => {

  useEffect(() => {
    if (!isAuthenticated) {
       history.push("/admin/login");
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isAuthenticated]);
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
            position: 'fixed',
            left: 0,
        }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
            <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
              <Link to={`${url}/dashboard`}>Dashboard</Link>
            </Menu.Item>
            <SubMenu key="sales" icon={<DollarCircleOutlined />} title="Sales">
              <Menu.Item key="order"><Link to={`${url}/order`}>Orders</Link></Menu.Item>
              <Menu.Item key="review"><Link to={`${url}/review`}>Reviews</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="catalog" icon={<ProfileOutlined />} title="Catalog">
              <Menu.Item key="product"><Link to={`${url}/product`}>Product</Link></Menu.Item>
              <Menu.Item key="category"><Link to={`${url}/category`}>Category</Link></Menu.Item>
              <Menu.Item key="blog"><Link to={`${url}/blog`}>Blog</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="marketing" icon={<LineChartOutlined />} title="Marketing">
              <Menu.Item key="coupon">Cart Price Rules</Menu.Item>
              <Menu.Item key="discount">Catalog Price Rules</Menu.Item>
            </SubMenu>
            <Menu.Item key="customer" icon={<UserOutlined />}>
              <Link to={`${url}/customer`}>Customer</Link>
            </Menu.Item>
            <Menu.Item key="admin" icon={<SolutionOutlined />}>
              <Link to={`${url}/list-admin`}>Admin</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LeftCircleOutlined />} onClick={e => logoutAdmin()}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
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
               <Route path={`${path}/product/create`} component={ProductCreate} />
               <Route path={`${path}/product/update/:id`} component={ProductUpdate} />
               <Route path={`${path}/product`} exact component={ProductTable} />
               <Route path={`${path}/category/create`} component={CateCreate} />
               <Route path={`${path}/category/update/:id`} component={CateUpdate} />
               <Route path={`${path}/category`} exact component={CateTable} />
               <Route path={`${path}/order`} exact component={OrderTable} />
               <Route path={`${path}/blog/create`} component={BlogCreate} />
               <Route path={`${path}/blog/update/:id`} component={BlogUpdate} />
               <Route path={`${path}/blog`} exact component={BlogTable} />
               <Route path={`${path}/review`} exact component={ReviewTable} />
               <Redirect from="*" to="/admin/dashboard" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
 };
 
const mapStateToProps = state => ({
  adminer: state.adminer,
  isAuthenticated: state.adminer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {setCurrentAdmin, logoutAdmin}
)(Dashboard);
 