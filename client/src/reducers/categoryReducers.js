import { GET_CHILD_CATES, 
    GET_CATEGORIES,
    TOGGLE_CATEGORY_LOADING,
    UPDATE_CATEGORY,
 } from '../actions/types';
 
 const initialState = {
    childCates: [],
    list: [],
    loading: false
 };
 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action) {
     switch (action.type) {
       case GET_CATEGORIES:
          return {
             ...state,
             list: action.payload
          };
       case UPDATE_CATEGORY:
         const list = state.list.filter(
            cate => cate._id !== cate.payload._id
         );
         return {
            ...state,
            data: action.payload,
            list: [...list, action.payload]
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