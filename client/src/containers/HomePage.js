import React, {useEffect, useState} from "react";
import { Carousel, Row, Col, Typography } from "antd";
import { connect } from "react-redux";
import axios from 'axios';
import ProductList from "../components/product/ProductList";
const HomePage = ({isAuthenticated}) => {
    const [list, setList] = useState([]);
    const getList = () => {
        axios
        .get("/api/product/home")
        .then(res => {
           setList(res.data);
        })
        .catch(err => {
           console.log(err)
        });
      }
    useEffect( () => {
        getList();
    }, [])
   return (
        <Row gutter={[24,24]}>
            <Col span={24}>
                <Carousel autoplay={true}>
                <img src="/home-page/banner1.webp" alt="banner-1"/>
                <img src="/home-page/banner2.webp" alt="banner-2"/>
                <img src="/home-page/banner3.webp" alt="banner-3"/>
                <img src="/home-page/banner4.webp" alt="banner-4"/>
                </Carousel>
            </Col>
            <Col span={24} style={{ textAlign: "center"}}>
                <Typography.Title level={1}>New arrivals</Typography.Title>
            </Col>
            <Col span={24}>
                <ProductList listing={list} isAuthenticated={isAuthenticated} column={5}/>
            </Col>
        </Row>

   );
};

const mapStateToProps = state => ({
    isAuthenticated: state.customer.isAuthenticated
  });
  
export default connect(
mapStateToProps,
{}
)(HomePage);