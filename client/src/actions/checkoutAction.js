import axios from "axios";

import { GET_PAYMENT, 
    GET_SHIPPING,
    SET_CART,
    SET_ERROR,
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
 
 export const guestCheckout = (data, history) => dispatch => {
   dispatch(toogleCheckoutLoading());
   axios
      .post(`/api/checkout/guest`, data)
      .then(res => {
         if (res.error) {
            dispatch({
               type: SET_ERROR,
               payload: res.data.message
            });
         } else {
            dispatch({
               type: SET_CART,
               payload: []
            });
            history.push("/");
         }
         dispatch(toogleCheckoutLoading());
      })
      .catch(err => {
         dispatch(toogleCheckoutLoading());
      });
};

export const checkout = (data, history) => dispatch => {
   dispatch(toogleCheckoutLoading());
   axios
      .post(`/api/checkout`, data)
      .then(res => {
         if (res.error) {
            dispatch({
               type: SET_ERROR,
               payload: res.data.message
            });
         } else {
            dispatch({
               type: SET_CART,
               payload: []
            });
            history.push("/");
         }
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

