import axios from "axios";

import { GET_PAYMENT, 
    GET_SHIPPING,
    TOGGLE_CHECKOUT_LOADING
} from "./types";

export const getShipping = () => dispatch => {
   dispatch(toogleCheckoutLoading());
   axios
      .get("/api/checkout/shipping")
      .then(res => {
         dispatch({
            type: GET_SHIPPING,
            payload: res.data
         });
         dispatch(toogleCheckoutLoading());
      })
      .catch(err => {
         dispatch(toogleCheckoutLoading());
      });
};

export const getPayment = () => dispatch => {
    dispatch(toogleCheckoutLoading());
    axios
       .get(`/api/checkout/payment`)
       .then(res => {
          dispatch({
             type: GET_PAYMENT,
             payload: res.data
          });
          dispatch(toogleCheckoutLoading());
       })
       .catch(err => {
          dispatch(toogleCheckoutLoading());
       });
 };
 

export const toogleCheckoutLoading = () => {
   return {
      type: TOGGLE_CHECKOUT_LOADING
   };
};

