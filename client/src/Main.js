import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import customerToken from "./utils/customerToken";
import HomePage from './containers/HomePage';
import CategoryPage from './containers/CategoryPage';
import ProductPage from './containers/ProductPage';
import CheckoutPage from './containers/CheckoutPage';

import Header from './components/Header';
import Login from './components/customer/Login';
import Footer from './components/Footer';
import { connect } from 'react-redux';
import { getCategories } from './actions/categoryAction';
import { toggleCart, toggleSearch, toggleWishlist } from './actions/globalAction';
import './main.scss';
import { Drawer, Layout, Button } from 'antd';
import Cart from './containers/Cart';
import Wishlist from './containers/Wishlist';

// if (localStorage.jwtToken) {
//     const token = localStorage.jwtToken;
//     customerToken(token);
//     const decoded = jwt_decode(token);
//     store.dispatch(setCurrentCustomer(decoded));
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp < currentTime) {
//         store.dispatch(logoutCustomer());
//         window.location.href = "./loginPage";
//     }
// }

const Main = ({getCategories, toggleCart, toggleSearch, toggleWishlist, list, isAuthenticated, global}) => {

    useEffect( () => {
        getCategories();
     }, [getCategories]);
    return (
        <BrowserRouter>
            <Layout>
                <Layout.Header>
                    <Header list={list} 
                    isAuthenticated={isAuthenticated} 
                    toggleCart={toggleCart} 
                    toggleWishlist={toggleWishlist} 
                    toggleSearch={toggleSearch}/>
                </Layout.Header>
                <Layout.Content>
                    <Switch>
                        <Route path="/customer/login" component={Login} />
                        <Route path="/checkout" component={CheckoutPage} />

                        {/* <Route path="/product/:id" component={ProductPage} /> */}
                        <Route path="/product/:id" component={ProductPage} />
                        <Route path="/category/:id" component={CategoryPage} />
                        <Route path="/" component={HomePage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Layout.Content>
                <Layout.Footer>
                    <Footer/>
                </Layout.Footer>
            </Layout>
            <Drawer
                title="My cart"
                placement="right"
                closable={false}
                onClose={toggleCart}
                visible={global.cartOpened}
            >
                <Cart/>
                <Link to='/checkout'><Button size="large" type="primary">Go to checkout</Button></Link>
            </Drawer>
            <Drawer
                title="My wishlist"
                placement="right"
                closable={false}
                onClose={toggleWishlist}
                visible={global.wishlistOpened}
            >
                <Wishlist />
            </Drawer>
            <Drawer
                title="Search"
                placement="right"
                closable={false}
                onClose={toggleSearch}
                visible={global.searchOpened}
                placement='top'
            >
                <p>Search</p>
            </Drawer>
         </BrowserRouter>
    );
 };
 const mapStateToProps = state => ({
    list: state.category.list,
    isAuthenticated: state.customer.isAuthenticated,
    global: state.global
  });
  
 export default connect(mapStateToProps, {getCategories, toggleCart, toggleSearch, toggleWishlist})(Main);