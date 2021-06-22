import React from "react";
import { connect } from "react-redux";
import AddressForm from "./AddressForm";
import Addresses from "../customer/Addresses";
import AddressListing from "./AddressListing";
const CustomerCheckout = ({data, defaultAddress, addressList}) => {
    const handleDelete = (id) => {
        console.log(id);
    }
    if (!defaultAddress) {
        return (
            <AddressForm data={data} />
        );
    }
    return (
        <AddressListing defaultAddress={defaultAddress} addressList={addressList} handleDelete={handleDelete}/>
    )
 };
 
 const mapStateToProps = state => ({
    data: state.customer.logData,
    defaultAddress: state.addressData.defaultAddress,
    addressList: state.addressData.currentList
  });

  export default connect(mapStateToProps, {})(CustomerCheckout);