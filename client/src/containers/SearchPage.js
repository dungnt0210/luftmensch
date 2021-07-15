import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {listProductByCategory} from '../actions/productAction';
import {addToWishlist} from '../actions/customerAction';

import { Card, Col, Row, Button, Typography, message } from 'antd';
import { Link} from 'react-router-dom';
import {
    HeartTwoTone
  } from '@ant-design/icons';

const SearchPage = ({
  listProductByCategory, 
  addToWishlist,
  wishlist,
  list, 
  match,
  history,
  isAuthenticated,
  loading}) => {
    useEffect(() => {
        listProductByCategory(match.params.id);
     }, [listProductByCategory, match]);
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
    <div className="site-card-wrapper">
    <Row gutter={[24, 24]}>
      {list.map(item => 
        (<Col span={8} key={item._id}>
          <Link to={`/product/${item._id}`}>
            <Card bordered={false} 
            hoverable 
            cover={<img alt="product" src={item.images[0]}/>}>
                <Typography.Title level={5}>{item.name}</Typography.Title>
                <br/>
                <Typography.Text>${item.finalPrice ? item.finalPrice : item.price}</Typography.Text>
                <Button onClick={e => handleClickWishlist(e, item._id)}
                className="product-wishlist"
                icon={<HeartTwoTone twoToneColor="#ffffff"/>} />
            </Card>
            </Link>
        </Col>)
      )}
    </Row>
  </div>
   );
};

const mapStateToProps = state => ({
  wishlist: state.customer.wishlist,
  list: state.product.list,
  isAuthenticated: state.customer.isAuthenticated,
  loading: state.product.productLoading || state.product.productsLoading
});

export default connect(
  mapStateToProps,
  {listProductByCategory, addToWishlist}
)(SearchPage);
  
