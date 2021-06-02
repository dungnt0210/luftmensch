import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginCustomer } from '../../actions/customerAction';
import { Row, Col, Typography, Form, Input, Button, Divider} from 'antd';
import {LockOutlined} from '@ant-design/icons';

const Account = ({ isAuthenticated, history }) => {

   const layout = {
      labelCol: { span: 5 },
     wrapperCol: { span: 16 },
   };
   const tailLayout = {
   wrapperCol: { span: 14 },
   };  
   
    const handleSubmit = (values) => {
      console.log(values);
   };
   
    return (
        <>
        <Divider orientation="left" plain>Acoount Infomation</Divider>
         <Row className="form-container" wrap={false}> 
            <Form onFinish={handleSubmit} {...layout} labelAlign="left">
            <Col span={12} >
             <Form.Item label="Email" name="email"
             rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password"
             rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item className="customer-save">
                <Button type="primary" htmlType="submit" size="large">
                Save
                </Button>
            </Form.Item>
            </Col>
            <Col  span={12}>
             <Form.Item label="Email" name="email"
             rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password"
             rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}>
                <Input.Password />
            </Form.Item>
            </Col>
         </Form>
         </Row>
         </>
    );
 };
 const mapStateToProps = state => ({
   isAuthenticated: state.customer.isAuthenticated
 });
 
 export default connect(mapStateToProps, {})(Account);
