import axios from "axios";
import customerToken from "../utils/customerToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_CUSTOMER, TOGGLE_CUSTOMER_LOADING} from "./types";

export const registerCustomer = (data, history) => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
      .post("/customer/signup", data)
      .then(res => {
         dispatch(toggleCustomerLoading());
         localStorage.setItem(
            "loginMessage",
            "Successfully registered. Login to continue"
         );
         history.push("/login");
      })
      .catch(err => {
        console.log(err);
         dispatch(toggleCustomerLoading());
      });
};

export const loginCustomer = data => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
      .post("/customer/login", data)
      .then(res => {
         const { token } = res.data;
         localStorage.setItem("jwtToken", token);
         customerToken(token);
         const decoded = jwt_decode(token);
         dispatch(setCurrentCustomer(decoded));
         dispatch(toggleCustomerLoading());
      })
      .catch(err => {
        console.log(err);
         dispatch(toggleCustomerLoading());
      });
};

export const setCurrentCustomer = data => {
   return {
      type: SET_CURRENT_CUSTOMER,
      payload: data
   };
};

export const toggleCustomerLoading = () => {
   return {
      type: TOGGLE_CUSTOMER_LOADING
   };
};

export const logoutCustomer = () => dispatch => {
   localStorage.removeItem("jwtToken");
   customerToken(false);
   dispatch(setCurrentCustomer({}));
};
