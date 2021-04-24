import {
    CREATE_PRODUCT,
    GET_PRODUCT,
    LIST_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    TOGGLE_PRODUCTS_LOADING,
    TOGGLE_PRODUCT_LOADING
 } from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
   data: {},
   lists: [],
   productLoading: false,
   productsLoading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
               ...state,
               lists: [...state.lists, action.payload]
            };
         case LIST_PRODUCTS:
            return {
               ...state,
               lists: [...action.payload]
            };
         case GET_PRODUCT:
            return {
               ...state,
               data: { ...action.payload }
            };
         case UPDATE_PRODUCT:
            const lists = state.lists.filter(
               product => product._id !== action.payload._id
            );
            return {
               ...state,
               data: action.payload,
               lists: [...lists, action.payload]
            };
         case DELETE_PRODUCT:
            return {
               ...state,
               lists: state.lists.filter(product => product._id !== action.payload)
            };
         case TOGGLE_PRODUCT_LOADING:
            return {
               ...state,
               productLoading: !state.productLoading
            };
         case TOGGLE_PRODUCTS_LOADING:
            return {
               ...state,
               productsLoading: !state.productsLoading
            };
         default:
            return state;
      }
 }