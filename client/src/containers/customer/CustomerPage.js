import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { getProfile } from '../../actions/customerAction';
import Account from "../../components/customer/Account";
import Addresses from "../../components/customer/Addresses";
import { deleteAddress } from '../../actions/addressAction';
import "./customer.scss"
const CustomerPage = ({ logData, loading, defaultAddress, addressList, getProfile, deleteAddress}) => {
    const { TabPane } = Tabs;
    useEffect( () => {
      getProfile();
    }, [getProfile])
    const handleDelete = (id) => {
      deleteAddress(id);
    }
    return (
        <div className="customer-content">
              <Tabs tabPosition="left">
              <TabPane tab="My Account" key="customer-account">
                <Account logData={logData} loading={loading}/>
              </TabPane>
              <TabPane tab="My Addresses" key="customer-addresses">
                <Addresses defaultAddress={defaultAddress} addressList={addressList} handleDelete={handleDelete}/>
              </TabPane>
              <TabPane tab="My Orders" key="customer-orders">
              Content of Tab 3
              </TabPane>
              <TabPane tab="My Saved Items" key="customer-wishlist">
                Content of Tab 4
              </TabPane>
              <TabPane tab="My Reviews" key="customer-reviews">
                Content of Tab 5
              </TabPane>
            </Tabs>
        </div>
    );
 };
 const mapStateToProps = state => ({
    logData: state.customer.logData,
    defaultAddress: state.addressData.defaultAddress,
    addressList: state.addressData.currentList,
    loading: state.customer.customerLoading
  });
  
 export default connect(mapStateToProps, {getProfile, deleteAddress})(CustomerPage);