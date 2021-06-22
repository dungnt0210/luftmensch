import { SET_CURRENT_ADMIN, 
   TOGGLE_ADMIN_LOADING, 
   LIST_ADMIN , 
   TOGGLE_ADMINS_LOADING,
   CREATE_ADMIN,
   DELETE_ADMIN,
   UPDATE_ADMIN
} from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   data: {},
   currentAdmin: {},
   list: [],
   adminLoading: false,
   adminsLoading: false
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
      case CREATE_ADMIN:
         return {
            ...state,
            list: [...state.list, action.payload]
         };
      case LIST_ADMIN:
         return {
            ...state,
            list: [...action.payload]
         };
      case UPDATE_ADMIN:
         let listFilter = state.list.filter(
            admin => admin._id !== action.payload._id
         );
         return {
            ...state,
            data: action.payload,
            list: [...listFilter, action.payload]
         };
      case DELETE_ADMIN:
         listFilter = state.list.filter(
            admin => admin._id !== action.payload.id
         );
         return {
            ...state,
            data: action.payload,
            list: [...listFilter]
         };
       case SET_CURRENT_ADMIN:
          return {
             ...state,
             isAuthenticated: !isEmpty(action.payload),
             currentAdmin: action.payload
          };
       case TOGGLE_ADMIN_LOADING:
          return {
             ...state,
             adminLoading: !state.adminLoading
          };
      case TOGGLE_ADMINS_LOADING:
         return {
            ...state,
            adminsLoading: !state.adminsLoading
         };
       default:
          return state;
    }
 }