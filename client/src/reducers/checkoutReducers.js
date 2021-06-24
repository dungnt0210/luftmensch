import { GET_PAYMENT, 
    GET_SHIPPING,
    TOGGLE_CHECKOUT_LOADING
 } from '../actions/types';
 
 const initialState = {
    payments: [],
    shipping: [],
    loading: false
 };
 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action) {
     switch (action.type) {
       case GET_PAYMENT:
          return {
             ...state,
             payments: action.payload
          };
       case GET_SHIPPING:
          return {
             ...state,
             shipping: action.payload
          };
        case TOGGLE_CHECKOUT_LOADING:
           return {
              ...state,
              loading: !state.loading
           };
        default:
           return state;
     }
  }