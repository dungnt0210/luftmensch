import React from "react";
import { Result,Typography } from "antd";
import { Link } from "react-router-dom";
const ErrorPage = () => {
   return (
    <div className="common-page">
            <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={[
      <Typography.Link key="buy"><Link to="/">Continue shopping</Link></Typography.Link>
    ]}
  />
    </div>

   );
};

export default ErrorPage;
   
