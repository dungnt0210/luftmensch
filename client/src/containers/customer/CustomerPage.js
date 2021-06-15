import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { getProfile } from '../../actions/customerAction';
import Account from "../../components/customer/Account";
import Address from "../../components/customer/Address";
import Addresses from "../../components/customer/Addresses";

import "./customer.scss"
const CustomerPage = ({isAuthenticated, logData, defaultAddress, addressList, getProfile}) => {
    const { TabPane } = Tabs;
    useEffect( () => {
      getProfile();
    }, [getProfile])
    return (
        <div className="customer-content">
              <Tabs tabPosition="left">
              <TabPane tab="My Account" key="customer-account">
                <Account />
              </TabPane>
              <TabPane tab="My Addresses" key="customer-addresses">
                <Addresses defaultAddress={defaultAddress} addressList={addressList}/>
              </TabPane>
              <TabPane tab="My Orders" key="customer-orders">
                <Address />
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
    isAuthenticated: state.customer.isAuthenticated,
    logData: state.customer.logData,
    defaultAddress: state.addressData.defaultAddress,
    addressList: state.addressData.currentList
  });
  
 export default connect(mapStateToProps, {getProfile})(CustomerPage);