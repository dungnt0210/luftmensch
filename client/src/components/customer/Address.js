import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCommunes, getDistricts, getProvinces, createAddress, updateAddress } from '../../actions/addressAction';
import { Form, Input, Select, Modal, Switch} from 'antd';

const Address = ({ communes, 
    districts, 
    provinces, 
    getCommunes, 
    getDistricts, 
    getProvinces,
    createAddress,
    updateAddress,
    data,
    visible,
    hasAddress,
    defaultId,
    onCancel,
    onSave
  }) => {
   useEffect(() => {
     getProvinces();
   }, [getProvinces]);
   
   const [form] = Form.useForm();
   const [checkDefault, setCheckDefault] = useState(false);
   useEffect(() => {
     if (!data.isEmpty) {
      getDistricts(data.province.value);
      getCommunes(data.province.value, data.district.value);
      form.setFieldsValue(data);
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    if (!hasAddress)
    setCheckDefault(true);
  }, [hasAddress]);
   const handleChangeProvince = (value) => {
      getDistricts(value.value);
      getCommunes(value, "none");
      form.resetFields(['district', 'commune']);
   };
   const handleChangeDistrict = (value) => {
    getCommunes(form.getFieldValue('province').value, value.value);
    form.resetFields(['commune']);
 };
    const onCreate = (values) => {
      if (data.isEmpty) {
        createAddress({isDefault: checkDefault, defaultId: defaultId, ...values});
      } else {
        updateAddress(data._id, values)
      }
      onSave();
    }
  
    return (
      <Modal
      visible={visible}
      title={data.isEmpty ? "Create a new address" : "Edit address"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setCheckDefault(false);
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
         <Form
         form={form}
        layout="vertical"
      >
        <Form.Item
          name="telephone"
          label="Phone number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="detail"
          label="Detail Address"
          rules={[
            {
              required: true,
              message: 'Please input your detail address',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="province"
          label="Province"
          rules={[
            {
              required: true,
              message: 'Please input your province',
            },
          ]}
        >
          <Select labelInValue options={provinces} onChange={handleChangeProvince}/>
        </Form.Item>
        <Form.Item
          name="district"
          label="District"
          rules={[
            {
              required: true,
              message: 'Please input your district',
            },
          ]}
        >
          <Select labelInValue options={districts} onChange={handleChangeDistrict}/>
        </Form.Item>
        <Form.Item
          name="commune"
          label="Commune"
          rules={[
            {
              required: true,
              message: 'Please input your commune',
            },
          ]}
        >
          <Select labelInValue options={communes}/>
        </Form.Item>
        <Form.Item hidden={!data.isEmpty} label="Default address">
          <Switch checked={checkDefault} disabled={!hasAddress} onChange={checked => setCheckDefault(checked)} />
        </Form.Item>
      </Form>
    </Modal>
    );
 };
 const mapStateToProps = state => ({
   communes: state.addressData.communes,
   districts: state.addressData.districts,
   provinces: state.addressData.provinces
 });
 
 export default connect(mapStateToProps, {getCommunes, getDistricts, getProvinces, createAddress, updateAddress})(Address);