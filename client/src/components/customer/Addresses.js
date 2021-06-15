import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Card, Row, Col, Divider, Button, Typography } from 'antd';
import { EditOutlined, PlusOutlined , CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import Address from "./Address";

const Addresses = ({defaultAddress, addressList}) => {
     const [isEditing, setIsEditing] = useState(false);
     const [checkedAddress, setCheckedAddress] = useState({isEmpty: true});
     const onCancel = () => {
       setIsEditing(false);
     }
     const onSave = () => {
      setIsEditing(false);
    }
    const newAddress = () => {
      setIsEditing(true);
      setCheckedAddress({isEmpty: true});
    }
    const editAddress = (item) => {
      setIsEditing(true);
      setCheckedAddress({isEmpty: false, ...item});
    }
    return (
        <>
        <Row gutter={16}>
            <Col span={6}>
              <Button type="primary" icon={<PlusOutlined />}  key="new-address" onClick={e => newAddress()}>New Address</Button>
            </Col>
              <Address visible={isEditing}
                onCancel={onCancel}
                onSave={onSave}
                data={checkedAddress}
                />
        </Row>
        <Divider />
        <Row gutter={16}>
            <Col span={12}>
                <Card title="Default address" className="default-address" extra={[<Button onClick={e => editAddress(defaultAddress)} icon={<EditOutlined />}  key="edit-address" >Edit</Button>]}>
                <p>Phone number: {defaultAddress.telephone}</p>
                {defaultAddress.detail}, {defaultAddress.commune.name}, {defaultAddress.district.name}, {defaultAddress.province.name}
                </Card>
            </Col>
        </Row>
        <Divider />
        <Row>
            <Typography.Title level={3}>More addresses</Typography.Title>
            <Col span={24}>
                <List
                grid={{
                gutter: 16,
                column: 2
                }}
                dataSource={addressList}
                renderItem={item => (
                <List.Item>
                    <Card title={item.telephone} actions={
                      [
                        <Button icon={<CheckOutlined />} type="primary" key={`set-default-address-${item.index}`}>Set as default</Button>,
                        <Button icon={<EditOutlined />} onClick={e => editAddress(item)} key={`edit-address-${item.index}`} >Edit</Button>,
                        <Button icon={<DeleteOutlined />} type="danger" key={`delete-address-${item.index}`}>Remove</Button>,
                      ]
                    }>
                    {item.detail}, {item.commune.name}, {item.district.name}, {item.province.name}
                    </Card>
                </List.Item>
                )}
            />
            </Col>
        </Row>
        </>
    );
}
const mapStateToProps = state => ({
  addresses: state.customer.addresses,
});

export default connect(mapStateToProps, {})(Addresses);