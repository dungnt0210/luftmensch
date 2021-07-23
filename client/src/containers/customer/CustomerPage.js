import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { getProfile } from '../../actions/customerAction';
import Account from "../../components/customer/Account";
import Reviews from "../../components/customer/Reviews";
import Addresses from "../../components/customer/Addresses";
import { deleteAddress } from '../../actions/addressAction';
import Orders from "../../components/customer/Orders";
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
        <div className="customer-content common-page">
              <Tabs tabPosition="left">
              <TabPane tab="My Account" key="customer-account">
                <Account logData={logData} loading={loading}/>
              </TabPane>
              <TabPane tab="My Addresses" key="customer-addresses">
                <Addresses defaultAddress={defaultAddress} addressList={addressList} handleDelete={handleDelete}/>
              </TabPane>
              <TabPane tab="My Orders" key="customer-orders">
                <Orders orders={logData.orders}/>
              </TabPane>
              <TabPane tab="My Reviews" key="customer-reviews">
                <Reviews reviews={logData.reviews} />
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