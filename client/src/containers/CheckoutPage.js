import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Result, Button, Row, Col, Select } from 'antd';
import Cart from '../containers/Cart'; 
import Checkout from '../components/customer/Checkout';

const CheckoutPage = ({cart, history}) => {
    if(cart === undefined || cart.length == 0) {
        return (
            <Result
                status="warning"
                title="Please add products to cart before checkout"
              />
        )
    }
    return(
        <div className="checkout-wrapper">
            <Row gutter={24}>
                <Col span={14}>
                    <Checkout />
                </Col>
                <Col span={10} className="checkout-cart">
                    <Cart/>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = state => ({
    cart: state.customer.cart,
    isAuthenticated: state.customer.isAuthenticated
});
export default withRouter(connect(
    mapStateToProps,
    {}
)(CheckoutPage));
   
