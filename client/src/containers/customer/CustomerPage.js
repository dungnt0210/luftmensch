import React, {useEffect} from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Menu, Tabs } from 'antd';
import Login from "../../components/customer/Login";
import Account from "../../components/customer/Account";
import "./customer.scss"
const CustomerPage = ({isAuthenticated}) => {
    const { TabPane } = Tabs;
    return (
        <div className="customer-content">
              <Tabs tabPosition="left">
              <TabPane tab="My Account" key="customer-account">
                <Account />
              </TabPane>
              <TabPane tab="My Addresses" key="customer-addresses">
                Content of Tab 2
              </TabPane>
              <TabPane tab="My Orders" key="customer-orders">
                Content of Tab 3
              </TabPane>
              <TabPane tab="My Saved Items" key="customer-wishlist">
                Content of Tab 4
              </TabPane>
              <TabPane tab="My Reviews" key="customer-reviews">
                Content of Tab 5
              </TabPane>
            </Tabs>
        </div>
    );
 };
 const mapStateToProps = state => ({
    isAuthenticated: state.customer.isAuthenticated
  });
  
 export default connect(mapStateToProps, {})(CustomerPage);