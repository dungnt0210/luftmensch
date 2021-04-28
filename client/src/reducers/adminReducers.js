import {TOGGLE_ADMIN_LOADING, TOGGLE_ADMINER_LOADING, SET_CURRENT_ADMIN} from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   data: {},
   adminLoading: false,
   adminersLoading: false
};
export default function(state = initialState, action) {
    switch (action.type) {
       case SET_CURRENT_ADMIN:
          return {
             ...state,
             isAuthenticated: !isEmpty(action.payload),
             data: action.payload
          };
       case TOGGLE_ADMIN_LOADING:
          return {
             ...state,
             adminLoading: !state.adminLoading
          };
        case TOGGLE_ADMINER_LOADING:
        return {
            ...state,
            adminerLoading: !state.adminerLoading
        };
       default:
          return state;
    }
 }