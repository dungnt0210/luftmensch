import React from "react";
import { connect } from "react-redux";
import { loginCustomer } from '../../actions/customerAction';
import { Row, Col, Typography, Form, Input, Radio, Select} from 'antd';
import './login.scss';

const layout = {
   labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
wrapperCol: { span: 14 },
};  

const Checkout = ({ isAuthenticated, loginCustomer, history }) => {
   const provinceSource = [
       {label: "test", value: "test"}
   ]
    return (
      <div>
         <Row >
            <Col span={24} >
            <Typography.Title level={3}>Contact Information</Typography.Title>
            <Form {... layout} className="checkout-form">
             <Form.Item label="Email" labelAlign="left" name="email" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item labelAlign="left" label="Phone number" name="phoneNumber" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item labelAlign="left" label="Fullname" name="name" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input your full name!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Typography.Title level={3}>Shipping address</Typography.Title>
            <Form.Item labelAlign="left" label="detail" name="detail" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input your detail address!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item labelAlign="left" label="Province" name="province" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input province!',
                },
                ]}>
                <Select options={provinceSource} style={{ width: 120 }}/>
            </Form.Item>
            <Form.Item labelAlign="left" label="District" name="district" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input district!',
                },
                ]}>
                <Select options={provinceSource} style={{ width: 120 }}/>
            </Form.Item>
            <Form.Item labelAlign="left" label="Commune" name="commune" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input commune!',
                },
                ]}>
                 <Select options={provinceSource} style={{ width: 120 }}/>
            </Form.Item>
            <Typography.Title level={3}>Payment method</Typography.Title>
            <Radio.Group >
                <Radio value={1}>Check/Money Order</Radio>
            </Radio.Group>
         </Form>
            </Col>
         </Row>
      </div>
      
    );
 };
 
 const mapStateToProps = state => ({
   isAuthenticated: state.customer.isAuthenticated
 });
 
 export default connect(mapStateToProps, {loginCustomer})(Checkout);
