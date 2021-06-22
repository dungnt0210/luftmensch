import React, { useEffect, useState } from "react";
import { List, Card, Row, Col, Divider, Button, Typography, Radio } from 'antd';
import { connect } from 'react-redux';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Address from "../customer/Address";
import { setDefaultAddress } from '../../actions/addressAction';

const AddressListing = ({defaultAddress, addressList, setDefaultAddress}) => {
     const [isEditing, setIsEditing] = useState(false);
     const [checkedAddress, setCheckedAddress] = useState({isEmpty: true});
     const [hasAddress, setHasAddress] = useState(false);
     const [fullAddresses, setFullAdressses] = useState([defaultAddress]);
     const [chooseAddress, setChooseAddress] = useState(defaultAddress._id);
     useEffect( () => {
      if (!defaultAddress) {
        setHasAddress(false);
      } else {
        setHasAddress(true);
      }
     }, [defaultAddress]);
     
     useEffect( () => {
       if (addressList) {
          setFullAdressses([defaultAddress,...addressList]);
       }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [defaultAddress, addressList]);
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
    const handlePickAddress = (e) => {
      setChooseAddress(e.target.value)
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
            <Row>
                <Col span={24}>
                <Radio.Group onChange={handlePickAddress} value={chooseAddress}>
                    <List
                    grid={{
                    gutter: 16,
                    column: 2
                    }}
                    dataSource={fullAddresses}
                    renderItem={item => (
                    <List.Item>
                        <Card title={item.telephone} actions={
                          [
                            <Button icon={<EditOutlined />} onClick={e => editAddress(item)} key={`edit-address-${item.index}`} >Edit</Button>,
                          ]
                        }
                        extra={[<Radio value={item._id}/>]}
                        >
                        {item.detail}, {item.commune.label}, {item.district.label}, {item.province.label}
                        </Card>
                    </List.Item>
                    )}
                />
                </Radio.Group>
                </Col>
            </Row>
        </>
    );
}

export default connect(null, {setDefaultAddress})(AddressListing);