import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProductById} from '../actions/productAction';
import ProductSlider from '../components/product/ProductSlider';
import ProductInfo from '../components/product/ProductInfo';
import PropTypes from "prop-types";

import { Card, Col, Row, Typography } from 'antd';

const ProductPage = ({getProductById, match, history, loading}) => {
    useEffect(() => {
        getProductById(match.params.id);
     }, [getProductById, match.params.id]);
   return (
    <div className="site-card-wrapper">
    <Row gutter={24}>
        <Col span={14}>
            <ProductSlider history={history} />
        </Col>
        <Col span={10}>
            <ProductInfo history={history} />
        </Col>
    </Row>
  </div>
   );
};

ProductPage.propTypes = {
 data: PropTypes.object.isRequired
};

export default withRouter(connect(
    null,
    {getProductById}
  )(ProductPage));
   
