import React from "react";
import { Form, Input, Button } from 'antd';
import { connect } from "react-redux";
import { loginAdmin } from '../../actions/adminAction';

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
const Login = ({ loginAdmin }) => {

    const handleSubmit = (values) => {
       loginAdmin(values)
    };
 
    return (  
         <Form onFinish={handleSubmit} {... layout} >
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
    );
 };
 

 export default connect(null, {loginAdmin})(Login);
 