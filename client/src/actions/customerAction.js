import axios from "axios";
import customerToken from "../utils/customerToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_CUSTOMER, 
   TOGGLE_CUSTOMER_LOADING, 
   UPDATE_CUSTOMER, 
   LIST_CUSTOMERS, 
   TOGGLE_CUSTOMERS_LOADING,
   SET_CART,
   SET_WISHLIST,
   SET_TOTAL
} from "./types";

export const registerCustomer = (data, history) => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
      .post("/customer/signup", data)
      .then(res => {
         dispatch(toggleCustomerLoading());
         localStorage.setItem(
            "loginMessage",
            "Successfully registered. Login to continue"
         );
         history.push("/login");
      })
      .catch(err => {
        console.log(err);
         dispatch(toggleCustomerLoading());
      });
};

export const loginCustomer = (data, history) => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
      .post("/api/customer/login", data)
      .then(res => {
         const { token } = res.data;
         localStorage.setItem("customerToken", token);
         customerToken(token);
         const decoded = jwt_decode(token);
         dispatch(setCurrentCustomer(decoded));
         history.push('/customer/account');
         dispatch(toggleCustomerLoading());
      })
      .catch(err => {
        console.log(err);
         dispatch(toggleCustomerLoading());
      });
};

export const setCurrentCustomer = data => {
   return {
      type: SET_CURRENT_CUSTOMER,
      payload: data
   };
};

export const toggleCustomerLoading = () => {
   return {
      type: TOGGLE_CUSTOMER_LOADING
   };
};

export const toggleCustomersLoading = () => {
   return {
      type: TOGGLE_CUSTOMERS_LOADING
   };
};

export const listCustomers = () => dispatch => {
   dispatch(toggleCustomersLoading());
   axios
      .get(`/api/customer/`)
      .then(res => {
         dispatch({
            type: LIST_CUSTOMERS,
            payload: res.data
         });
         dispatch(toggleCustomersLoading());
      })
      .catch(err => {
         dispatch(toggleCustomersLoading());
      });
};

export const getCustomerById = id => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
      .get(`/api/customer/${id}`)
      .then(res => {
         dispatch({
            type: SET_CURRENT_CUSTOMER,
            payload: res.data
         });
         console.log(res.data);
         dispatch(toggleCustomerLoading());
      })
      .catch(err => {
         dispatch(toggleCustomerLoading());
      });
};

export const updateCustomer = (id, data) => dispatch => {
   dispatch(toggleCustomersLoading());
   axios
      .patch(`/api/customer/update/${id}`, data)
      .then(res => {
         dispatch({
            type: UPDATE_CUSTOMER,
            payload: res.data
         });
         dispatch(toggleCustomersLoading());
      })
      .catch(err => {
         dispatch(toggleCustomersLoading());
      });
};

export const addToCart = (product, cart, isAuthenticated) => dispatch => {
   dispatch(toggleCustomerLoading());
   if (isAuthenticated) {
      axios
      .patch("/api/customer/add-to-cart", product)
      .then(res => {
         dispatch({
            type: SET_CART,
            payload: res.data.reverse()
         });
         dispatch(setTotal(cart));
      })
      .catch(err => {
        console.log(err);
         dispatch(toggleCustomerLoading());
      });
   } else {
      let key = cart.findIndex(item => 
         item.productId._id == product.productId._id && 
         item.options.size == product.options.size && 
         item.options.color == product.options.color );
      if (key === -1) {
         cart.unshift(product);
      } else {
         cart[key].options.qty = cart[key].options.qty + parseFloat(product.options.qty);
      }
      dispatch({
         type: SET_CART,
         payload: cart
      });
      dispatch(setTotal(cart));
      dispatch(toggleCustomerLoading());
   }
};

export const removeFromCart = (cart, isAuthenticated, index) => dispatch => {
   dispatch(toggleCustomerLoading());
   if (isAuthenticated) {
      axios
      .patch("/api/customer/remove-from-cart", {itemId: cart[index]._id})
      .then(res => {
         dispatch({
            type: SET_CART,
            payload: res.data.reverse()
         });
         dispatch(setTotal(cart));
      })
      .catch(err => {
         console.log(err);
         dispatch(toggleCustomerLoading());
      });
   } else {
      cart.splice(index, 1);
      dispatch({
         type: SET_CART,
         payload: cart
      });
      dispatch(setTotal(cart));
      dispatch(toggleCustomerLoading());
   }
};

export const setTotal = (cart) => async (dispatch) => {
   let total = 0;
   await cart.forEach(element => total += parseFloat(element.options.qty)*parseFloat(element.productId.price));
   dispatch({
      type: SET_TOTAL,
      payload: total
   });
}

export const addToWishlist = (productId, wishlist, isAuthenticated, history) => dispatch => {
   if (isAuthenticated ) {
      dispatch(toggleCustomerLoading());
      axios
      .patch("/api/customer/add-to-wishlist",  {productId: productId})
      .then(res => {
         dispatch({
            type: SET_WISHLIST,
            payload: res.data
         });
         dispatch(toggleCustomerLoading());
      })
      .catch(err => {
         dispatch(toggleCustomerLoading());
         });
   } else {
      history.push("/customer/login");
   }
};

export const removeFromWishlist = (productId) => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
   .patch("/api/customer/remove-from-wishlist",  {productId: productId})
   .then(res => {
      dispatch({
         type: SET_WISHLIST,
         payload: res.data
      });
      dispatch(toggleCustomerLoading());
   })
   .catch(err => {
      dispatch(toggleCustomerLoading());
      });
};

export const getWishlist = () => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
   .get("/api/customer/wishlist")
   .then(res => {
      dispatch({
         type: SET_WISHLIST,
         payload: res.data
      });
      dispatch(toggleCustomerLoading());
   })
   .catch(err => {
      dispatch(toggleCustomerLoading());
      });
};

export const getCart = () => dispatch => {
   dispatch(toggleCustomerLoading());
   axios
   .get("/api/customer/cart")
   .then(res => {
      dispatch({ 
         type: SET_CART,
         payload: res.data
      });
      dispatch(toggleCustomerLoading());
   })
   .catch(err => {
      dispatch(toggleCustomerLoading());
      });
};

export const logoutCustomer = () => dispatch => {
   localStorage.removeItem("customerToken");
   customerToken(false);
   dispatch(setCurrentCustomer({}));
};