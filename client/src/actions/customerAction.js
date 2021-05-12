import axios from "axios";
import customerToken from "../utils/customerToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_CUSTOMER, TOGGLE_CUSTOMER_LOADING, UPDATE_CUSTOMER, LIST_CUSTOMERS, TOGGLE_CUSTOMERS_LOADING} from "./types";

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

export const toggleCustomersLoading = () => {
   return {
      type: TOGGLE_CUSTOMERS_LOADING
   };
};

export const listCustomers = () => dispatch => {
   dispatch(toggleCustomersLoading());
   axios
      .get(`/api/customer/`)
      .then(res => {
         dispatch({
            type: LIST_CUSTOMERS,
            payload: res.data
         });
         dispatch(toggleCustomersLoading());
      })
      .catch(err => {
         dispatch(toggleCustomersLoading());
      });
};

export const getCustomerById = id => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
      .get(`/api/customer/${id}`)
      .then(res => {
         dispatch({
            type: SET_CURRENT_CUSTOMER,
            payload: res.data
         });
         console.log(res.data);
         dispatch(toggleCustomerLoading());
      })
      .catch(err => {
         dispatch(toggleCustomerLoading());
      });
};

export const updateCustomer = (id, data) => dispatch => {
   dispatch(toggleCustomersLoading());
   axios
      .patch(`/api/customer/update/${id}`, data)
      .then(res => {
         dispatch({
            type: UPDATE_CUSTOMER,
            payload: res.data
         });
         dispatch(toggleCustomersLoading());
      })
      .catch(err => {
         dispatch(toggleCustomersLoading());
      });
};

export const logoutCustomer = () => dispatch => {
   localStorage.removeItem("jwtToken");
   customerToken(false);
   dispatch(setCurrentCustomer({}));
};
