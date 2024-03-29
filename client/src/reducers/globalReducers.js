import { 
   TOGGLE_CART,
   TOGGLE_WISHLIST,
   TOGGLE_SEARCH,
   SET_ERROR
} from '../actions/types';

const initialState = {
   cartOpened: false,
   wishlistOpened: false,
   searchOpened: false,
   errorMessage: ""
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
       case TOGGLE_CART:
          return {
            wishlistOpened: false,
            searchOpened: false,
            cartOpened: !state.cartOpened
          };
        case TOGGLE_WISHLIST:
        return {
            cartOpened: false,
            searchOpened: false,
            wishlistOpened: !state.wishlistOpened
        };
        case SET_ERROR:
        return {
            ...state,
            errorMessage: action.payload
        };
        case TOGGLE_SEARCH:
        return {
            cartOpened: false,
            wishlistOpened: false,
            searchOpened: !state.searchOpened
        };
      default:
          return state;
    }
 }