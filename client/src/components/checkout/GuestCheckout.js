import React from "react";

import AddressForm from "./AddressForm";

const GuestCheckout = () => {
    const data = { email: "", name: ""}
    return (
        <AddressForm data={data} />
    );
 };
 
 export default GuestCheckout;