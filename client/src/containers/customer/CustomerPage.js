import React, {useEffect} from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Login from "../../components/customer/Login";
import Account from "../../components/customer/Account";
import "./customer.scss"
const CustomerPage = ({isAuthenticated}) => {

    return (
        <BrowserRouter >
          <Menu mode="inline" defaultSelectedKeys={['customer-account']} className="customer-menu">
            <Menu.Item key="customer-account">
              <Link to={"/customer/account"}>My Account</Link>
            </Menu.Item>
            <Menu.Item key="customer-addresses">
              <Link to={"/customer/addresses"}>My Addresses</Link>
            </Menu.Item>
            <Menu.Item key="customer-orders">
              <Link to={"/customer/orders"}>My Orders</Link>
            </Menu.Item>
            <Menu.Item key="customer-wishlist">
              <Link to={"/customer/wishlist"}>My Wishlist</Link>
            </Menu.Item>
            <Menu.Item key="customer-reviews">
              <Link to={"/customer/reviews"}>My Reviews</Link>
            </Menu.Item>
          </Menu>
          <div className="customer-content">
            <Switch>
                <Route path="/customer/orders/:id" component={Login} />
                <Route path="/customer/orders" component={Login} />
                <Route path="/customer/addresses/:id" component={Login} />
                <Route path="/customer/addresses" component={Login} />
                <Route path="/customer/reviews" component={Login} />
                <Route path="/customer/wishlist" component={Login} />
                <Route path="/" component={Account} />
            </Switch>
          </div>
         </BrowserRouter>
    );
 };
 const mapStateToProps = state => ({
    isAuthenticated: state.customer.isAuthenticated
  });
  
 export default connect(mapStateToProps, {})(CustomerPage);