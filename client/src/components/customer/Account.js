import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProfile, updatePassword } from '../../actions/customerAction';
import { Row, Col, Form, Input, Button, Divider, Checkbox} from 'antd';

const Account = ({ logData, loading, updateProfile, updatePassword }) => {

    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [accountForm] = Form.useForm();
    useEffect( () => {
        accountForm.setFieldsValue({
            name: logData.name ? logData.name : "",
            email: logData.email ? logData.email : "",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logData])
   const layout = {
      labelCol: { span: 7 },
     wrapperCol: { span: 15 },
   };
   
    const handleSubmit = (values) => {
        if (changePassword) {
            updatePassword(values);
        } else {
            updateProfile({changeEmail: changeEmail, ...values})
        }
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
            <Form onFinish={handleSubmit} {...layout} labelAlign="left" form={accountForm}>
            <Col span={12} >
             <Form.Item label="Email" name="email"
             rules={[
                {
                    required: changeEmail,
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
                <Button type="primary" htmlType="submit" size="large" disabled={loading}>
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
            <Form.Item label="New password" name="newPassword" hidden={!(changePassword)}
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
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                {
                    required: changePassword,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || !changePassword || getFieldValue('newPassword') === value) {
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
 
 export default connect(null, {updateProfile, updatePassword})(Account);
