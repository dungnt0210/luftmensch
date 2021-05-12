import { SET_CURRENT_CUSTOMER, TOGGLE_CUSTOMER_LOADING, UPDATE_CUSTOMER, LIST_CUSTOMERS, TOGGLE_CUSTOMERS_LOADING} from '../actions/types';

import { 
   TOGGLE_ADDRESS_LOADING,
} from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   data: {},
   customerLoading: false,
   customersLoading: false,
   addressesLoading: false,
   list: []
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
      case TOGGLE_CUSTOMERS_LOADING:
      return {
         ...state,
         customersLoading: !state.customersLoading
      };
      case UPDATE_CUSTOMER:
      return {
         ...state,
         data: action.payload
      };
      case LIST_CUSTOMERS:
      return {
         ...state,
         list: action.payload
      };
      case TOGGLE_ADDRESS_LOADING:
      return {
         ...state,
         addressesLoading: !state.addressesLoading
      };
      default:
          return state;
    }
 }