import axios from "axios";

import { 
   TOGGLE_ADDRESS_LOADING
} from "./types";

export const createAddress = (data, history) => dispatch => {
   dispatch(toggleAddressLoading());
   axios
      .post("/api/address/create", data)
      .then(res => {
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
};

export const deleteAddress = (id) => dispatch => {
   dispatch(toggleAddressLoading());
   axios
      .delete(`/api/address/delete/${id}`)
      .then(res => {
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
};

export const updateAddress = (id, data) => dispatch => {
   dispatch(toggleAddressLoading());
   axios
      .patch(`/api/address/update/${id}`, data)
      .then(res => {
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
};

export const toggleAddressLoading = () => {
   return {
      type: TOGGLE_ADDRESS_LOADING
   };
};