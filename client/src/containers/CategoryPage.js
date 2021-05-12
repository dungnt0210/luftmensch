import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {listProductByCategory} from '../actions/productAction';
import { Card, Col, Row, Button, Typography } from 'antd';
import { Link} from 'react-router-dom';
import {
    HeartTwoTone
  } from '@ant-design/icons';

const CategoryPage = ({listProductByCategory, list, match, loading}) => {
    useEffect(() => {
        listProductByCategory(match.params.id);
     }, [listProductByCategory, match]);

   return (
    <div className="site-card-wrapper">
    <Row gutter={24}>
      {list.map(item => 
        (<Col span={8}>
          <Link to={`/product/${item._id}`}>
            <Card bordered={false} 
            hoverable 
            cover={<img alt="product" src={item.images[0]}/>}>
                <Typography.Title level={5}>{item.name}</Typography.Title>
                <br/>
                <Typography.Text>${item.finalPrice ? item.finalPrice : item.price}</Typography.Text>
                <HeartTwoTone className="product-wishlist" twoToneColor="#ffffff"/>
            </Card>
            </Link>
        </Col>)
      )}
    </Row>
  </div>
   );
};

  const mapStateToProps = state => ({
    list: state.product.list,
    loading: state.product.productLoading || state.product.productsLoading
  });
  
  export default connect(
    mapStateToProps,
    {listProductByCategory}
  )(CategoryPage);
   
