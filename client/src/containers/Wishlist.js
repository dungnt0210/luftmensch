import React , {useEffect, useState} from "react";
import { connect } from 'react-redux';
import  { Link } from 'react-router-dom';
import { Col , Button, Typography, Image, Divider, Row } from 'antd';
import {
    DeleteOutlined
  } from '@ant-design/icons';
const Wishlist = ({wishlist, loading,  isAuthenticated}) => {
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
                            <Button type="danger" icon={<DeleteOutlined/>}>Delete</Button>
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
    isAuthenticated: state.customer.isAuthenticated
  });
   export default connect(
    mapStateToProps,
    {}
  )(Wishlist);
   
