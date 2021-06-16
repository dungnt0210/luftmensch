import React, { useEffect, useState } from "react";
import { List, Card, Row, Col, Divider, Button, Typography } from 'antd';
import { connect } from 'react-redux';

import { EditOutlined, PlusOutlined , CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import Address from "./Address";
import { setDefaultAddress } from '../../actions/addressAction';

const Addresses = ({defaultAddress, addressList, handleDelete, setDefaultAddress}) => {
     const [isEditing, setIsEditing] = useState(false);
     const [checkedAddress, setCheckedAddress] = useState({isEmpty: true});
     const [hasAddress, setHasAddress] = useState(false);
     useEffect( () => {
      if (typeof defaultAddress === 'undefined') {
        setHasAddress(false);
      } else {
        setHasAddress(true);
      }
     }, [defaultAddress])
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
    const handleSetDefault = (newId) => {
      setDefaultAddress(newId, defaultAddress);
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
                hasAddress={hasAddress}
                defaultId={hasAddress ? defaultAddress._id : false}
                />
        </Row>
        <Divider />
        {
          hasAddress ?
          ( <>        
            <Row gutter={16}>
              <Col span={12}>
              <Card title="Default address" className="default-address" extra={[<Button onClick={e => editAddress(defaultAddress)} icon={<EditOutlined />}  key="edit-address" >Edit</Button>]}>
              <p>Phone number: {defaultAddress.telephone}</p>
              {defaultAddress.detail}, {defaultAddress.commune.label}, {defaultAddress.district.label}, {defaultAddress.province.label}
              </Card>
              </Col>
            </Row>
            <Divider />
            <Row>
                {
                  addressList.length ?
                  (<Typography.Title level={3}>More addresses</Typography.Title>) : null}
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
                            <Button icon={<CheckOutlined />} type="primary" onClick={e => handleSetDefault(item._id)} key={`set-default-address-${item.index}`}>Set as default</Button>,
                            <Button icon={<EditOutlined />} onClick={e => editAddress(item)} key={`edit-address-${item.index}`} >Edit</Button>,
                            <Button icon={<DeleteOutlined />} onClick={e => handleDelete(item._id)} type="danger" key={`delete-address-${item.index}`}>Remove</Button>,
                          ]
                        }>
                        {item.detail}, {item.commune.label}, {item.district.label}, {item.province.label}
                        </Card>
                    </List.Item>
                    )}
                />
                </Col>
            </Row>
            </>
        ) : <Typography.Title level={3}>You don't have any addresses</Typography.Title>
        }
        </>
    );
}

export default connect(null, {setDefaultAddress})(Addresses);