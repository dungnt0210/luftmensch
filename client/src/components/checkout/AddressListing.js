import React, { useEffect, forwardRef, useState, useImperativeHandle } from "react";

import { List, Card, Row, Col, Divider, Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { checkout } from '../../actions/checkoutAction';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import Address from "../customer/Address";

const AddressListing = forwardRef(({defaultAddress, addressList, logData, checkout}, ref) => {
     const [isEditing, setIsEditing] = useState(false);
     const history = useHistory();
     const [checkedAddress, setCheckedAddress] = useState({isEmpty: true});
     const [hasAddress, setHasAddress] = useState(false);
     const [fullAddresses, setFullAdressses] = useState([]);
     const [chooseAddress, setChooseAddress] = useState(defaultAddress._id);
     useEffect( () => {
      if (!defaultAddress) {
        setHasAddress(false);
      } else {
        setHasAddress(true);
      }
     }, [defaultAddress]);
     
     useEffect( () => {
       if (defaultAddress) {
         let newAddressList = [defaultAddress];
         setFullAdressses(newAddressList);
       }
       if (addressList && defaultAddress) {
         let newAddressList = [defaultAddress,...addressList];
          setFullAdressses(newAddressList);
       }
     }, [addressList, defaultAddress]);
     useEffect( () => {
      console.log(fullAddresses)
    }, [fullAddresses]);
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
    useImperativeHandle(ref, () => ({
      confirmAddress(shipping, payment, isAuthenticated, cart, total) {
        let contactAddress =  fullAddresses.find(item => item._id === chooseAddress)
        let order = {
          total: total,
          products: cart.map(item => ({product: item.productId._id, options: item.options})),
          shipping: {
            method: shipping._id,
            fee: shipping.fee
          },
          payment: payment._id,
          contact: {email: logData.email, name: logData.name, ...contactAddress},
          createAddress: false
        };
        checkout(order, history);
      }
    }));
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
                    loading={!fullAddresses}
                    dataSource={fullAddresses ? fullAddresses : []}
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
});
const mapStateToProps = state => ({
  defaultAddress: state.addressData.defaultAddress,
  addressList: state.addressData.currentList
});
export default connect(mapStateToProps, {checkout}, null, {forwardRef: true})(AddressListing);