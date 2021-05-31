import React, {useEffect, useState} from "react";

import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutCustomer } from '../../actions/customerAction';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
const Account = ({}) => {

    return (
        <BrowserRouter>
          <Menu  mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={"/list-admin"}>List Admin</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to={"/customer"}>Customer</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to={"/tested"}>Tested</Link>
            </Menu.Item>
          </Menu>
            <Switch>
                <Route path="/customer/orders/:id" component={Account} />
                <Route path="/customer/orders" component={Account} />
                <Route path="/customer/addresses/:id" component={Account} />
                <Route path="/customer/addresses" component={Account} />
                <Route path="/customer/reviews" component={Account} />
                <Route path="/customer/wishlist" component={Account} />
            </Switch>
         </BrowserRouter>
    );
 };
 const mapStateToProps = state => ({
    isAuthenticated: state.customer.isAuthenticated
  });
  
 export default connect(mapStateToProps, {logoutCustomer})(Account);