import axios from "axios";

import { GET_CHILD_CATES, 
    GET_CATEGORIES,
    TOGGLE_CATEGORY_LOADING,
    UPDATE_CATEGORY
 } from "./types";

export const getCategories = () => dispatch => {
   dispatch(toggleCategoryLoading());
   axios
      .get("/api/category")
      .then(res => {
         dispatch({
            type: GET_CATEGORIES,
            payload: res.data
         });
         dispatch(toggleCategoryLoading());
      })
      .catch(err => {
         dispatch(toggleCategoryLoading());
      });
};

export const updateCategory = (id, data) => dispatch => {
   dispatch(toggleCategoryLoading());
   axios
      .patch(`/api/category/update/${id}`, data)
      .then(res => {
         dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data
         });
         dispatch(toggleCategoryLoading());
      })
      .catch(err => {
         dispatch(toggleCategoryLoading());
      });
};

export const getChildCates = (id) => dispatch => {
    dispatch(toggleCategoryLoading());
    axios
       .get(`/api/category/main-cate/${id}`)
       .then(res => {
          dispatch({
             type: GET_CHILD_CATES,
             payload: res.data
          });
          dispatch(toggleCategoryLoading());
       })
       .catch(err => {
          dispatch(toggleCategoryLoading());
       });
 };
 

export const toggleCategoryLoading = () => {
   return {
      type: TOGGLE_CATEGORY_LOADING
   };
};

