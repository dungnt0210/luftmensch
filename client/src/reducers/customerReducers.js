import {TOGGLE_CUSTOMER_LOADING, SET_CURRENT_CUSTOMER} from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   data: {},
   customerLoading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
       case SET_CURRENT_CUSTOMER:
          return {
             ...state,
             isAuthenticated: !isEmpty(action.payload),
             data: action.payload
          };
       case TOGGLE_CUSTOMER_LOADING:
          return {
             ...state,
             customerLoading: !state.customerLoading
          };
       default:
          return state;
    }
 }