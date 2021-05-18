import {
   TOGGLE_CART, 
   TOGGLE_WISHLIST, 
   TOGGLE_SEARCH,
} from "./types";

export const toggleCart = () => {
   return {
      type: TOGGLE_CART
   };
};

export const toggleWishlist = () => {
   return {
      type: TOGGLE_WISHLIST
   };
};

export const toggleSearch = () => {
   return {
      type: TOGGLE_SEARCH
   };
};