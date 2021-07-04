import React, {useEffect, useState, useRef} from "react";
import { connect } from 'react-redux';
import { Result, Row, Col, Button } from 'antd';
import Cart from '../containers/Cart'; 
import AddressListing from "../components/checkout/AddressListing";
import AddressForm from "../components/checkout/AddressForm";
import Payment from "../components/checkout/Payment";
import Shipping from "../components/checkout/Shipping";
import "./checkout.scss";
import { getProfile, getCart, getCartLocal } from "../actions/customerAction";
import { getPayment, getShipping } from "../actions/checkoutAction";

const CheckoutPage = ({
    isAuthenticated, 
    cart, 
    data,
    total,
    defaultAddress, 
    addressList, 
    shippingMethods, 
    paymentMethods, 
    getCartLocal, 
    getCart, 
    getProfile, 
    getShipping,
    getPayment
    }) => {
    
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
    const checkoutAddress = useRef();
    const emptyData = { email: "", name: ""};
    let addressComponent;
    
    if (isAuthenticated) {
        if (defaultAddress) {
            addressComponent =  <AddressListing logData={data} ref={checkoutAddress} defaultAddress={defaultAddress} addressList={addressList} />
        } else {
            addressComponent =  <AddressForm ref={checkoutAddress} data={data} />
        }
    } else {
        addressComponent =  <AddressForm ref={checkoutAddress} data={emptyData} />
    }
    const [payment, setPayment] = useState("");
    const [shipping, setShipping] =useState("");

    const handleChangePayment  = e => {
        setPayment(e.target.value);
    }
    const handleChangeShipping  = e => {
        setShipping(e.target.value);
    }
    const sendOrder = (e) => {
        let shippingItem = shippingMethods.find(item => item.value === shipping);
        let paymentItem = paymentMethods.find(item => item.value === payment);
        checkoutAddress.current.confirmAddress(shippingItem, paymentItem, isAuthenticated, cart, total);
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
                    {addressComponent}
                    <Shipping methods={paymentMethods} shipping={shipping} handleChangeShipping={handleChangeShipping}/>
                    <Payment method={shippingMethods} payment={payment} handleChangePayment={handleChangePayment}/>
                </Col>
                <Col span={10} className="checkout-cart">
                    <Cart />
                    <Button type="primary" size="large" onClick={sendOrder}>Place Order</Button>
                </Col>
            </Row>
        </>
    )
};

const mapStateToProps = state => ({
    cart: state.customer.cart,
    isAuthenticated: state.customer.isAuthenticated,
    data: state.customer.logData,
    total: state.customer.total,
    defaultAddress: state.addressData.defaultAddress,
    addressList: state.addressData.currentList,
    paymentMethods: state.checkout.payments,
    shippingMethods: state.checkout.shipping
});
export default connect(
    mapStateToProps,
    {getCartLocal, getCart, getProfile, getPayment, getShipping}
)(CheckoutPage);
   
