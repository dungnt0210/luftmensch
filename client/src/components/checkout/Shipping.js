import React from "react";
import { connect } from "react-redux";
import { Typography, Radio, Space } from 'antd';

const Shipping = ({methods, shipping, handleChangeShipping}) => {

    return (
        <>
            <Typography level={4}>Shipping Method</Typography>
            <Radio.Group value={shipping} onChange={handleChangeShipping}>
                <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
                </Space>
            </Radio.Group>
        </>
    )
 };
 
 const mapStateToProps = state => ({
    methods: state.checkout.shipping,
  });

  export default connect(mapStateToProps, {})(Shipping);