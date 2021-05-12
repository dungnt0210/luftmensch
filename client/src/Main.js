import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import customerToken from "./utils/customerToken";
import HomePage from './containers/HomePage';
import CategoryPage from './containers/CategoryPage';
import ProductPage from './containers/ProductPage';

import Header from './components/Header';
import Footer from './components/Footer';
import { connect } from 'react-redux';
import { getCategories } from './actions/categoryAction';
import './main.scss';
import { Drawer, Layout } from 'antd';

// import Footer from './components/Footeer';

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

const Main = ({getCategories, list, isAuthenticated}) => {

    useEffect( () => {
        getCategories();
     }, [getCategories]);
    return (
        <BrowserRouter>``
            <Layout>
                <Layout.Header>
                    <Header list={list} isAuthenticated={isAuthenticated}/>
                </Layout.Header>
                <Layout.Content>
                    <Switch>
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
         </BrowserRouter>
    );
 };
 const mapStateToProps = state => ({
    list: state.category.list,
    isAuthenticated: state.customer.isAuthenticated
  });
  
 export default connect(mapStateToProps, {getCategories})(Main);