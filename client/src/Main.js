import React, {useEffect} from "react";
import jwt_decode from "jwt-decode";
import store from "./store";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import customerToken from "./utils/customerToken";
import HomePage from './containers/HomePage';
import CategoryPage from './containers/CategoryPage';
import ProductPage from './containers/ProductPage';
import CheckoutPage from './containers/CheckoutPage';
import Header from './components/Header';
import Login from './components/customer/Login';
import CustomerPage from './containers/customer/CustomerPage';

import Footer from './components/Footer';
import { connect } from 'react-redux';
import { getCategories } from './actions/categoryAction';
import { logoutCustomer, setCurrentCustomer } from './actions/customerAction';
import { toggleCart, toggleSearch, toggleWishlist } from './actions/globalAction';
import './main.scss';
import { Drawer, Layout, Button } from 'antd';
import Cart from './containers/Cart';
import Wishlist from './containers/Wishlist';
import Maincate from "./containers/Maincate";
import Search from './containers/Search';
import SearchPage from "./containers/SearchPage";
import SuccessPage from './containers/SuccessPage';
import Signup from './components/customer/Signup';
import ErrorPage from './containers/ErrorPage';

if (typeof localStorage.customerToken !== "undefined") {
    const token = localStorage.customerToken;
    customerToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentCustomer(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutCustomer());
        window.location.href = "./customer/login";
    }
}

const Main = ({
    getCategories,
    toggleCart,
    toggleSearch,
    toggleWishlist,
    logoutCustomer,
    list,
    isAuthenticated,
    global}) => {

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
                    toggleSearch={toggleSearch}
                    logoutCustomer={logoutCustomer}
                    />
                </Layout.Header>
                <Layout.Content>
                    <Switch>
                        <Route exact path="/customer/login" component={Login} />
                        <Route exact path="/customer/signup" component={Signup} />
                        <Route exact path="/customer/account" component={CustomerPage} />
                        <Route exact path="/checkout" component={CheckoutPage} />
                        <Route exact path="/product/:id" component={ProductPage} />
                        <Route exact path="/category/:id" component={CategoryPage} />
                        <Route exact path="/main-cate/:id" component={Maincate} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/checkoutsuccess" component={SuccessPage} />
                        <Route exact path="/notfound" component={ErrorPage} />
                        <Route exact path="/" component={HomePage} />
                        <Redirect from="*" to="/notfound" />
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
                <Cart
                    isAuthenticated={isAuthenticated}
                />
                <Link to='/checkout'><Button size="large" type="primary">Go to checkout</Button></Link>
            </Drawer>
            <Drawer
                title="My wishlist"
                placement="right"
                closable={false}
                onClose={toggleWishlist}
                visible={global.wishlistOpened}
            >
                <Wishlist 
                    isAuthenticated={isAuthenticated}
                 />
            </Drawer>
            <Drawer
                title="Search"
                closable={false}
                onClose={toggleSearch}
                visible={global.searchOpened}
                height={400}
                placement='top'
            >
                <Search/>
            </Drawer>
         </BrowserRouter>
    );
 };
 const mapStateToProps = state => ({
    list: state.category.list,
    isAuthenticated: state.customer.isAuthenticated,
    global: state.global
  });
  
 export default connect(mapStateToProps, {getCategories, toggleCart, toggleSearch, toggleWishlist, logoutCustomer})(Main);