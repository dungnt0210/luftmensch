import { GET_CHILD_CATES, 
    GET_CATEGORIES,
    TOGGLE_CATEGORY_LOADING
 } from '../actions/types';
 
 const initialState = {
    childCates: [],
    list: [],
    loading: false
 };
 export default function(state = initialState, action) {
     switch (action.type) {
       case GET_CATEGORIES:
          return {
             ...state,
             list: action.payload
          };
       case GET_CHILD_CATES:
          return {
             ...state,
             childCates: action.payload
          };
        case TOGGLE_CATEGORY_LOADING:
           return {
              ...state,
              loading: !state.loading
           };
        default:
           return state;
     }
  }