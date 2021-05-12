import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {getProductById} from '../actions/productAction';
import ProductSlider from '../components/product/ProductSlider';
import ProductInfo from '../components/product/ProductInfo';
import PropTypes from "prop-types";

import { Card, Col, Row, Typography } from 'antd';
import {
    HeartOutlined,
    ShoppingOutlined
  } from '@ant-design/icons';

const ProductPage = ({getProductById, match, loading}) => {
    useEffect(() => {
        getProductById(match.params.id);
     }, [getProductById, match.params.id]);
   return (
    <div className="site-card-wrapper">
    <Row gutter={24}>
        <Col span={14}>
            <ProductSlider />
        </Col>
        <Col span={10}>
            <ProductInfo />
        </Col>
    </Row>
  </div>
   );
};

ProductPage.propTypes = {
 data: PropTypes.object.isRequired
};

export default connect(
    null,
    {getProductById}
  )(ProductPage);
   
