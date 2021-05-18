import { 
   TOGGLE_CART,
   TOGGLE_WISHLIST,
   TOGGLE_SEARCH
} from '../actions/types';

const initialState = {
   cartOpened: false,
   wishlistOpened: false,
   searchOpened: false
};
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
            wishlistOpened: false,
            searchOpened: false,
            wishlistOpened: !state.wishlistOpened
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