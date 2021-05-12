import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Input } from 'antd';
import './footer.scss';
import {
    ArrowRightOutlined
  } from '@ant-design/icons';

const Footer = () => {

    return(
        <>
        <Row>
          <Col span={12} className="left-footer-col">
            <Typography.Title level={2}>Luftmensch</Typography.Title>
            <Typography.Link>About Us</Typography.Link>
            <Typography.Link>Privacy Policy</Typography.Link>
            <Typography.Link>Term of Services</Typography.Link>
            <Typography.Link>FAQs</Typography.Link>
            <Typography.Text>Copyright ©2021</Typography.Text>
            <Typography.Text>Luftmensch Ltd</Typography.Text>
            <Typography.Text>Company no: +84866460800</Typography.Text>
          </Col>
          <Col span={12} className="right-footer-col">
            <Typography.Title level={2}>Subcribe as newsletter</Typography.Title>
            <Input.Search  size="large"
                  placeholder="Enter your email"
                enterButton="Send"
                suffix={<ArrowRightOutlined />}
                />
          </Col>
        </Row>
        </>
    );
 };
 

  export default Footer;
  