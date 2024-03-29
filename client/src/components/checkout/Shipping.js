import React from "react";
import { connect } from "react-redux";
import { Typography, Radio, Space } from 'antd';

const Shipping = ({methods, shipping, handleChangeShipping}) => {

    return (
        <>
            <Typography level={4}>Shipping Method</Typography>
            <Space>            
                <Radio.Group value={shipping} options={methods} onChange={handleChangeShipping} />
            </Space>
        </>
    )
 };
 
 const mapStateToProps = state => ({
    methods: state.checkout.shipping,
  });

  export default connect(mapStateToProps, {})(Shipping);