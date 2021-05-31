import React , {useEffect, useState} from "react";
import { connect } from 'react-redux';
import  { Link } from 'react-router-dom';
import { Col , Button, Typography, Image, Divider, Row } from 'antd';
import {
    DeleteOutlined
  } from '@ant-design/icons';
  import { getWishlist, removeFromWishlist } from '../actions/customerAction';

const Wishlist = ({wishlist, loading,  isAuthenticated, getWishlist, removeFromWishlist}) => {
    useEffect( () => {
        if(isAuthenticated) {
            getWishlist();
        }
    },[isAuthenticated, getWishlist, removeFromWishlist]);

    const handleRemove = (e, productId) => {
        e.preventDefault();
        removeFromWishlist(productId);
    }
   return (
       <div>
        {isAuthenticated && wishlist ? 
            wishlist.map( (item, index) => 
                (
                    <div>
                    <Row>
                        <Col span={12}>
                        <Image
                            width={160}
                            src={item.images[0]}
                        />
                        </Col>
                        <Col span={12}>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                            <Typography.Paragraph>${item.price}</Typography.Paragraph>
                            <Button type="danger" onClick={e => handleRemove(e, item._id)} icon={<DeleteOutlined/>}>Remove</Button>
                        </Col>
                    </Row>
                        <Divider />
                    </div>
                )
            )
             :
            (<Typography.Text>Your wishlist is empty.</Typography.Text>)
        }
        </div>
   );
};
   const mapStateToProps = state => ({
    loading: state.customer.customerLoading,
    wishlist: state.customer.wishlist,
  });
   export default connect(
    mapStateToProps,
    {getWishlist, removeFromWishlist}
  )(Wishlist);
   
