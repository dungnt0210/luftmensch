import React from "react";
import { Result,Typography } from "antd";
import { Link } from "react-router-dom";
const SuccessPage = () => {
   return (
    <div className="common-page">
            <Result
    status="success"
    title="Successfully Purchased"
    extra={[
      <Typography.Link key="buy"><Link to="/">Continue shopping</Link></Typography.Link>
    ]}
  />
    </div>

   );
};

  
export default SuccessPage;
   
