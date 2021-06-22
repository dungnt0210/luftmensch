import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Result, Row, Col } from 'antd';
import Cart from '../containers/Cart'; 
import GuestCheckout from "../components/checkout/GuestCheckout";
import CustomerCheckout from "../components/checkout/CustomerCheckout";
import { getProfile, getCart, getCartLocal } from "../actions/customerAction";
const CheckoutPage = ({isAuthenticated, cart, getCartLocal, getCart, getProfile}) => {
    
    useEffect( () => {
        if (!isAuthenticated) {
            getCartLocal();
        } else {
            getProfile();
            getCart();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    if(typeof cart === "undefined" || cart.length === 0) {
        return (
            <Result
                status="warning"
                title="Please add products to cart before checkout"
              />
        )
    }
    return(
        <>
            <Row gutter={24}>
                <Col span={14}>
                    {isAuthenticated ? 
                        (<CustomerCheckout />) :
                        (<GuestCheckout />)
                    }
                </Col>
                <Col span={10} className="checkout-cart">
                    <Cart />
                </Col>
            </Row>
        </>
    )
};

const mapStateToProps = state => ({
    cart: state.customer.cart,
    isAuthenticated: state.customer.isAuthenticated
});
export default withRouter(connect(
    mapStateToProps,
    {getCartLocal, getCart, getProfile}
)(CheckoutPage));
   
