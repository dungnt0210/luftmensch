import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutCustomer } from "../actions/customerActions";

const HomePage = ({ isAuthenticated, logoutCustomer }) => {

   return (
        <div>
            <h1>Hello</h1>
        {isAuthenticated ? 
            (
                <p>You're loged.</p>
           ) :
            (<p>You're not log in.</p>
            )
        }
        <button onClick={logoutCustomer}>Logout</button>
        </div>
        
   );
};

HomePage.propTypes = {
    isAuthenticated: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated: state.customer.isAuthenticated
});

export default connect(
    mapStateToProps,
    { logoutCustomer })
    (HomePage);
