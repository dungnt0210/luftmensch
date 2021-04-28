import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "../../components/admin/Login";
import { Row, Col, Typography} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import './login.scss';

const AdminLogin = ({ adminer, history }) => {
 
    useEffect(() => {
       if (adminer.isAuthenticated) {
          history.push("/admin");
       }
    }, []);
    return (
      <div>
         <Row className="main-container">
            <Col span={14} className="left-col"/>
            <Col span={10} className="right-col">
               <LockOutlined className="lock-icon"/>
               <Typography.Title level={3}>Sign in</Typography.Title>
               <Login className="login-form"/>
            </Col>
         </Row>
      </div>
      
    );
 };
 
 const mapStateToProps = state => ({
     adminer: state.adminer
 });
 
 export default connect(mapStateToProps)(AdminLogin);
 