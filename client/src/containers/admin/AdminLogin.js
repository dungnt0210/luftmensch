import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginAdmin } from '../../actions/adminAction';
import { Row, Col, Typography, Form, Input, Button} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import './login.scss';

const layout = {
   labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
wrapperCol: { span: 14 },
};  

const buttonLayout = {
  wrapperCol: { offset: 6, span: 12 },
}; 

const AdminLogin = ({ isAuthenticated, loginAdmin, history }) => {
 
    useEffect(() => {
       if (isAuthenticated) {
          history.push("/admin/dashboard");
       }
    }, [isAuthenticated, history]);

    const handleSubmit = (values) => {
      loginAdmin(values);
   };
   
    return (
      <div>
         <Row className="main-container">
            <Col span={14} className="left-col"/>
            <Col span={10} className="right-col">
               <LockOutlined className="lock-icon"/>
               <Typography.Title level={3}>Sign in</Typography.Title>
            <Form onFinish={handleSubmit} {... layout} className="login-form">
             <Form.Item label="Username" name="username" {... tailLayout}    
             rules={[
                {
                    required: true,
                    message: 'Please input your username!',
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
   isAuthenticated: state.adminer.isAuthenticated
 });
 
 export default connect(mapStateToProps, {loginAdmin})(AdminLogin);
 