import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerCustomer } from "../actions/customerActions";

const SignupPage = ({ registerCustomer, loggedCustomer, history }) => {
   const [customer, setCustomer] = useState({
      email: "",
      password: "",
      gender: ""
   });

   useEffect(() => {
      if (loggedCustomer.isAuthenticated) {
         history.push("/");
      }
      setCustomer(customer => {
         return { ...customer };
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
      const { email, password, gender } = customer;
      registerCustomer({ email, password, gender });
   };

   return (
        <form  noValidate onSubmit={handleSubmit}>
            <input name="email" placeholder="email" onChange={handleChange}/>
            <input name="password" placeholder="password" onChange={handleChange}/>
            <input name="gender" placeholder="gender" onChange={handleChange}/>
            <button type="submit">Sign up</button>
        </form>
   );
};

SignupPage.propTypes = {
loggedCustomer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedCustomer: state.customer
});

export default connect(
   mapStateToProps,
   { registerCustomer }
)(SignupPage);
