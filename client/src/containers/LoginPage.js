import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginCustomer } from "../actions/customerActions";

const LoginPage = ({ loginCustomer, loggedCustomer, history }) => {
   const [customer, setCustomer] = useState({
      email: "",
      password: ""
   });

   useEffect(() => {
      if (loggedCustomer.isAuthenticated) {
         history.push("/");
      }
      setCustomer(customer => {
         return { ...loggedCustomer };
      });
   }, [loggedCustomer, history]);

   const handleChange = e => {
      setCustomer({
         ...customer,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { email, password } = customer;
      loginCustomer({ email, password });
   };

   return (
        <form  noValidate onSubmit={handleSubmit}>
            <input name="email" onChange={handleChange}/>
            <input name="password" onChange={handleChange}/>
            <button type="submit">Login</button>
        </form>
   );
};

LoginPage.propTypes = {
   loginCustomer: PropTypes.func.isRequired,
   loggedCustomer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedCustomer: state.customer
});

export default connect(
   mapStateToProps,
   { loginCustomer }
)(LoginPage);
