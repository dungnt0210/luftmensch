import React from "react";
import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
    HeartTwoTone
  } from '@ant-design/icons';

const ProductItem = ({data, handleClickWishlist}) => {
  
   return (
    <Link to={`/product/${data._id}`}>
        <Card bordered={false} 
        hoverable 
        cover={<img alt="product" src={data.images[0]}/>}>
            <Typography.Title level={5}>{data.name}</Typography.Title>
            <br/>
            <Typography.Text>${data.finalPrice ? data.finalPrice : data.price}</Typography.Text>
            <Button onClick={e => handleClickWishlist(e, data._id)}
            className="product-wishlist"
            icon={<HeartTwoTone twoToneColor="#ffffff"/>} />
        </Card>
    </Link>
   );
};
export default ProductItem;
   
