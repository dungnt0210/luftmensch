import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginCustomer } from '../../actions/customerAction';
import { Row, Col, Typography, Form, Input, Button, Divider, Checkbox} from 'antd';
import {LockOutlined} from '@ant-design/icons';

const Account = ({ isAuthenticated, history }) => {

    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

   const layout = {
      labelCol: { span: 7 },
     wrapperCol: { span: 15 },
   };
   const tailLayout = {
   wrapperCol: { span: 14 },
   };  
   
    const handleSubmit = (values) => {
      console.log(values);
   };
   
    const hanldeChangeEmail = (e) => {
        setChangeEmail(!changeEmail);
    };
    const hanldeChangePassword = (e) => {
        setChangePassword(!changePassword);
    }
    return (
        <>
        <Divider orientation="left" plain>ACCOUNT INFOMATION</Divider>
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
                <Input disabled={!changeEmail}/>
            </Form.Item>
            <Form.Item label="Fullname" name="name"
             rules={[
                {
                    required: true,
                    message: 'Please input your name!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item className="customer-save">
                <Checkbox onChange={hanldeChangeEmail}>Change email</Checkbox>
            </Form.Item>
            <Form.Item className="customer-save">
                <Checkbox onChange={hanldeChangePassword}>Change password</Checkbox>
            </Form.Item>
            <Form.Item className="customer-save">
                <Button type="primary" htmlType="submit" size="large">
                Save
                </Button>
            </Form.Item>
            </Col>
            <Col  span={12}>
             <Form.Item label="Password" name="password" hidden={!(changeEmail || changePassword)}
             rules={[
                {
                    required: (changeEmail || changePassword),
                    message: 'Please input your password!',
                },
                ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="New password" name="new-password" hidden={!(changePassword)}
             rules={[
                {
                    required: (changePassword),
                    message: 'Please input your password!',
                },
                ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                hidden={!changePassword}
                label="Confirm Password"
                dependencies={['new-password']}
                hasFeedback
                rules={[
                {
                    required: changePassword,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || !changePassword || getFieldValue('new-password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
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
