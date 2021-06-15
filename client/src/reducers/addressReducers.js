import { SET_PROVINCES,
    SET_DISTRICTS,
    SET_COMMUNES,
    SET_CURRENT_LIST_ADDRESS,
    SET_DEFAULT_ADDRESS
 } from '../actions/types';
 
 const initialState = {
    communes: [],
    districts: [],
    provinces: [],
    currentList: [],
    defaultAddress: {}
 };
 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action) {
     switch (action.type) {
       case SET_COMMUNES:
           return {
              ...state,
              communes: action.payload
           };
        case SET_CURRENT_LIST_ADDRESS:
        return {
            ...state,
            currentList: action.payload
        };
        case SET_DEFAULT_ADDRESS:
            return {
                ...state,
            defaultAddress: action.payload
            };
        case SET_DISTRICTS:
        return {
            ...state,
            districts: action.payload
        };
        case SET_PROVINCES:
        return {
            ...state,
            provinces: action.payload
        };
       default:
           return state;
     }
  }