import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Result, Row, Col } from 'antd';
import Cart from '../containers/Cart'; 
import GuestCheckout from "../components/checkout/GuestCheckout";
import CustomerCheckout from "../components/checkout/CustomerCheckout";
import Payment from "../components/checkout/Payment";
import Shipping from "../components/checkout/Shipping";
import "./checkout.scss";
import { getProfile, getCart, getCartLocal } from "../actions/customerAction";
import { getPayment, getShipping } from "../actions/checkoutAction";

const CheckoutPage = ({isAuthenticated, cart, getCartLocal, getCart, getProfile, getShipping, getPayment}) => {
    
    useEffect( () => {
        if (!isAuthenticated) {
            getCartLocal();
        } else {
            getProfile();
            getCart();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect( () => {
        getShipping();
        getPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const [payment, setPayment] = useState("");
    const [shipping, setShipping] =useState("")
    const handleChangePayment  = e => {
        setPayment(e.target.value);
    }
    const handleChangeShipping  = e => {
        setShipping(e.target.value);
    }

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
                    <Shipping shipping={shipping} handleChangeShipping={handleChangeShipping}/>
                    <Payment payment={payment} handleChangePayment={handleChangePayment}/>
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
    {getCartLocal, getCart, getProfile, getPayment, getShipping}
)(CheckoutPage));
   
