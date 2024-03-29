import React , {useEffect} from "react";
import { connect } from 'react-redux';
import  { Link } from 'react-router-dom';
import { Col , Button, Typography, Image, Divider, Row, InputNumber } from 'antd';
import {
    DeleteOutlined
  } from '@ant-design/icons';
import { getCart, removeFromCart, updateCartItem, getCartLocal } from '../actions/customerAction';
const Cart = ({cart, total, loading, isAuthenticated, getCart, removeFromCart, updateCartItem, getCartLocal}) => {
    useEffect( () => {
        if(isAuthenticated) {
            getCart();
        } else {
            getCartLocal();
        }
    },[isAuthenticated, getCart, getCartLocal]);
    const handleRemove = (e, index) => {
        e.preventDefault();
        removeFromCart(cart, isAuthenticated, index);
    }
    const handleQty = (qty, index) => {
        updateCartItem(cart, isAuthenticated, index, qty);
    }
   return (
    <>
       <div className="cart-container">
        { cart ? 
            cart.map( (item, index) => 
                (
                    <div>
                    <Row>
                        <Col span={12}>
                        <Image
                            width={160}
                            src={`/product-img/${item.productId._id}/img-front.png`}
                        />
                        </Col>
                        <Col span={12}>
                            <Link to={`/product/${item.productId._id}`}>{item.productId.name}</Link>
                            <Typography.Paragraph>${item.productId.price}</Typography.Paragraph>
                            <Typography.Paragraph>Color: {item.options.color}</Typography.Paragraph>
                            <Typography.Paragraph>Size: {item.options.size}</Typography.Paragraph>
                            <Typography.Paragraph>Qty: <InputNumber min={1} max={item.options.maxQty} onChange={qty => handleQty(qty, index)} value={item.options.qty}/></Typography.Paragraph>
                            <Button type="danger" onClick={e => handleRemove(e, index)} icon={<DeleteOutlined/>}>Remove</Button>
                        </Col>
                    </Row>
                        <Divider />
                    </div>
                )
            )
             :
            (<Typography.Text>Your cart is empty.</Typography.Text>)
        }
        </div>
        <div>
        {cart ? 
            (<Typography.Title level={3}>Total: ${total}</Typography.Title>) : null
        }
        </div>
        </>
   );
};
   const mapStateToProps = state => ({
    loading: state.customer.customerLoading,
    cart: state.customer.cart,
    total: state.customer.total
  });
   export default connect(
    mapStateToProps,
    {getCart, removeFromCart, updateCartItem, getCartLocal}
  )(Cart);
   
