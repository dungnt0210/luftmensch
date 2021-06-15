import { SET_PROVINCES,
    SET_DISTRICTS,
    SET_COMMUNES,
    SET_CURRENT_LIST_ADDRESS,
    SET_DEFAULT_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS
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
        case UPDATE_ADDRESS:
            let currentList = state.currentList.filter(address => address._id !== action.payload._id)
            return {
                ...state,
            currentList: [action.payload, ...currentList]
            };
        case DELETE_ADDRESS:
            currentList = state.currentList.filter(address => address._id !== action.payload)
            return {
                ...state,
            currentList: [...currentList]
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