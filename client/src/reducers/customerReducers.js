import { SET_CURRENT_CUSTOMER, 
   TOGGLE_CUSTOMER_LOADING, 
   UPDATE_CUSTOMER,
   LIST_CUSTOMERS,
   TOGGLE_CUSTOMERS_LOADING,
   SET_CART,
   SET_WISHLIST,
   ADD_TO_CART,
   ADD_TO_WISHLIST,
   SET_TOTAL
} from '../actions/types';

import { 
   TOGGLE_ADDRESS_LOADING,
} from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   data: {},
   cart: [],
   wishlist: [],
   customerLoading: false,
   customersLoading: false,
   addressesLoading: false,
   total: 0,
   list: []
};
export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_CUSTOMER:
          return {
             ...state,
             isAuthenticated: !isEmpty(action.payload),
             data: action.payload,
          };
      case SET_CART:
      return {
         ...state,
         cart: action.payload,
      };
      case SET_TOTAL:
      return {
         ...state,
         total: action.payload,
      };
      case SET_WISHLIST:
      return {
         ...state,
         wishlist: action.payload,
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