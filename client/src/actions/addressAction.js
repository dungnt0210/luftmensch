import axios from "axios";

import { 
   TOGGLE_ADDRESS_LOADING,
   SET_COMMUNES,
   SET_DISTRICTS,
   SET_PROVINCES,
   SET_CURRENT_LIST_ADDRESS,
   SET_DEFAULT_ADDRESS,
   SET_CURRENT_CUSTOMER,
   UPDATE_ADDRESS,
   DELETE_ADDRESS
} from "./types";

export const createAddress = (data) => dispatch => {
   dispatch(toggleAddressLoading());
   axios
      .post("/api/address/create", data)
      .then(res => {
         let addresses = res.data.addresses;
         dispatch({
            type: SET_CURRENT_CUSTOMER,
            payload: res.data
         });
         dispatch({
            type: SET_CURRENT_LIST_ADDRESS,
            payload: addresses.filter(item => !item.isDefault)
         });
         dispatch({
            type: SET_DEFAULT_ADDRESS,
            payload: addresses.find(item => item.isDefault)
         });
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
         dispatch({
            type: DELETE_ADDRESS,
            payload: id
         });
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
         if (res.data.isDefault) {
            dispatch({
               type: SET_DEFAULT_ADDRESS,
               payload: res.data
            });
         } else {
            dispatch({
               type: UPDATE_ADDRESS,
               payload: res.data
            });
         }
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
};

export const setDefaultAddress = (newId, oldData) => dispatch => {
   dispatch(toggleAddressLoading());
   oldData.isDefault = false;
   axios
      .patch(`/api/address/set-default`, {old: oldData._id, new: newId})
      .then(res => {
         dispatch({
            type: SET_DEFAULT_ADDRESS,
            payload: res.data
         });
         dispatch({
            type: UPDATE_ADDRESS,
            payload: oldData
         });
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
};

export const getCommunes = (provinceCode, districtCode) => dispatch => {
   dispatch(toggleAddressLoading());
   if (districtCode === "none") {
      dispatch({
         type: SET_COMMUNES,
         payload: []
      });
   } else {
      axios
      .get(`/api/address/${provinceCode}/${districtCode}/communes`)
      .then(res => {
         dispatch({
            type: SET_COMMUNES,
            payload: res.data
         });
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
   }
   
};

export const getDistricts = (provinceCode) => dispatch => {
   dispatch(toggleAddressLoading());
   axios
      .get(`/api/address/${provinceCode}/districts`)
      .then(res => {
         dispatch({
            type: SET_DISTRICTS,
            payload: res.data
         });
         dispatch(toggleAddressLoading());
      })
      .catch(err => {
         dispatch(toggleAddressLoading());
      });
};

export const getProvinces = () => dispatch => {
   dispatch(toggleAddressLoading());
   axios
      .get(`/api/address/provinces`)
      .then(res => {
         dispatch({
            type: SET_PROVINCES,
            payload: res.data
         });
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