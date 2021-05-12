import axios from "axios";
import {
   CREATE_PRODUCT,
   GET_PRODUCT,
   LIST_PRODUCTS,
   UPDATE_PRODUCT,
   DELETE_PRODUCT,
   TOGGLE_PRODUCTS_LOADING,
   TOGGLE_PRODUCT_LOADING
} from "./types";

export const createProduct = (data, history) => dispatch => {
   dispatch(toggleProductLoading());
   axios
      .post("/api/product/create", data)
      .then(res => {
         dispatch({
            type: CREATE_PRODUCT,
            payload: res.data
         });
         dispatch(toggleProductLoading());
         history.push("/list-products");
      })
      .catch(err => {
         dispatch(toggleProductLoading());
      });
};

export const getProductById = id => dispatch => {
   axios
      .get(`/api/product/${id}`)
      .then(res => {
         dispatch({
            type: GET_PRODUCT,
            payload: res.data
         });
         dispatch(toggleProductLoading());
      })
      .catch(err => {
         dispatch(toggleProductLoading());
      });
};

export const listProducts = () => dispatch => {
   dispatch(toggleProductLoading());
   axios
      .get(`/api/product/`)
      .then(res => {
         dispatch({
            type: LIST_PRODUCTS,
            payload: res.data
         });
         console.log(res.data);
         dispatch(toggleProductLoading());
      })
      .catch(err => {
         dispatch(toggleProductLoading());
      });
};

export const listProductByCategory = (cateId) => dispatch => {
   dispatch(toggleProductLoading());
   axios
      .get(`/api/product/category/${cateId}`)
      .then(res => {
         dispatch({
            type: LIST_PRODUCTS,
            payload: res.data
         });
         dispatch(toggleProductLoading());
      })
      .catch(err => {
         dispatch(toggleProductLoading());
      });
};

export const updateProduct = (id, data, history) => dispatch => {
   dispatch(toggleProductLoading());
   axios
      .patch(`/api/product/update/${id}`, data)
      .then(res => {
         dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data
         });
         dispatch(toggleProductLoading());
         history.push(`/list-products`);
      })
      .catch(err => {
         dispatch(toggleProductLoading());
      });
};

export const deleteProduct = (id) => dispatch => {
   dispatch(toggleProductLoading());
   axios
      .delete(`/api/product/delete/${id}`)
      .then(res => {
         dispatch({
            type: DELETE_PRODUCT,
            payload: id
         });
         dispatch(toggleProductLoading());
      })
      .catch(err => {
         dispatch(toggleProductLoading());
      });
};

export const toggleProductLoading = () => {
   return {
      type: TOGGLE_PRODUCT_LOADING
   };
};

export const toggleProductsLoading = () => {
   return {
      type: TOGGLE_PRODUCTS_LOADING
   };
};
