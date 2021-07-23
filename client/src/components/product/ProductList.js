import React from "react";
import { List, message } from 'antd';
import ProductItem from './ProductItem';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {addToWishlist} from '../../actions/customerAction';

const ProductList = ({listing, wishlist, isAuthenticated, addToWishlist, column}) => {
    const history = useHistory();
    const handleClickWishlist = (e, productId) => {
        e.preventDefault();
        let key = wishlist.findIndex(item => item._id === productId);
        if (key === -1) {
          addToWishlist(productId, wishlist, isAuthenticated, history);
          message.success('This product is added to your wishlist');
        } else {
          message.warn('This product is already added to your wishlist');
        }
    }
   return (
        <List
        grid={{
        gutter: [24,24],
        column: column,
        }}
        dataSource={listing}
        renderItem={item => (
        <List.Item>
            <ProductItem data={item} handleClickWishlist={handleClickWishlist}/>
        </List.Item>
        )}
    />
   );
};
const mapStateToProps = state => ({
  wishlist: state.customer.wishlist,
});

export default connect(
  mapStateToProps,
  {addToWishlist}
)(ProductList);   
