import React from "react";
import { connect } from "react-redux";
import { Typography, Radio, Space, Empty, Image } from 'antd';

const Payment = ({methods, payment, handleChangePayment}) => {

    return (
        <>
            <Typography level={4}>Payment Method</Typography>
            <Radio.Group value={payment} onChange={handleChangePayment}>
                <Space direction="vertical">
                {methods ?
                    methods.map(item => 
                        (<Radio.Button className="payment-button" value={item.value}><img alt={item.label} src={item.logo} /></Radio.Button>)
                    ) : <Empty />
                }
                </Space>
            </Radio.Group>
        </>
    )
 };
 
 const mapStateToProps = state => ({
    methods: state.checkout.payments,
  });

  export default connect(mapStateToProps, {})(Payment);