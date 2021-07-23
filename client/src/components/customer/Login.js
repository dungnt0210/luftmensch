import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginCustomer } from '../../actions/customerAction';
import { Row, Col, Typography, Form, Input, Button} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import './login.scss';

const layout = {
   labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
wrapperCol: { span: 14 },
};  

const buttonLayout = {
  wrapperCol: { offset: 6, span: 12 },
}; 

const Login = ({ isAuthenticated, loginCustomer, history }) => {
 
    useEffect(() => {
       if (isAuthenticated) {
          history.push("/customer/account");
       }
    }, [isAuthenticated, history]);

    const handleSubmit = (values) => {
      loginCustomer(values, history);
   };
   
    return (
      <div>
         <Row className="form-container login-page">
            <Col span={12} style={{backgroundImage: "url(/home-page/banner1.webp)", backgroundSize: 'cover'}}/>
            <Col span={12} style={{padding: '100px 50px'}}>
               <LockOutlined className="lock-icon"/>
               <Typography.Title level={3}>Sign in</Typography.Title>
            <Form onFinish={handleSubmit} {... layout} className="login-form">
             <Form.Item label="Email" name="email" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" {... tailLayout}
             rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item {... buttonLayout}>
                <Button type="primary" htmlType="submit" size="large">
                SIGN IN
                </Button>
            </Form.Item>
         </Form>
            </Col>
         </Row>
      </div>
      
    );
 };
 
 const mapStateToProps = state => ({
   isAuthenticated: state.customer.isAuthenticated
 });
 
 export default connect(mapStateToProps, {loginCustomer})(Login);
