import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCommunes, getDistricts, getProvinces } from '../../actions/addressAction';
import { Form, Input, Select} from 'antd';

const AddressForm = ({ 
    isAuthenticated,
    communes, 
    districts, 
    provinces, 
    getCommunes, 
    getDistricts,
    getProvinces,
    data
  }) => {
   useEffect(() => {
     getProvinces();
   }, [getProvinces]);
   
   const [form] = Form.useForm();
   useEffect(() => {
       if(isAuthenticated) {
        form.setFieldsValue({email: data.email, name: data.name});
       }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
   const handleChangeProvince = (value) => {
      getDistricts(value.value);
      getCommunes(value, "none");
      form.resetFields(['district', 'commune']);
   };
   const handleChangeDistrict = (value) => {
    getCommunes(form.getFieldValue('province').value, value.value);
    form.resetFields(['commune']);
 };
  
    return (
         <Form
         form={form}
            layout="vertical"
         >
         <Form.Item
          name="email"
          label="Email"
          hidden={isAuthenticated}
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
          ]}
        ><Input /> </Form.Item>
        <Form.Item
          name="name"
          label="Full name"
          hidden={isAuthenticated}
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        ><Input /> </Form.Item>
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
      </Form>
    );
 };
 const mapStateToProps = state => ({
   isAuthenticated: state.customer.isAuthenticated,
   communes: state.addressData.communes,
   districts: state.addressData.districts,
   provinces: state.addressData.provinces
 });
 
 export default connect(mapStateToProps, {getCommunes, getDistricts, getProvinces})(AddressForm);