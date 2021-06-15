import axios from "axios";

import { 
   TOGGLE_ADDRESS_LOADING,
   SET_COMMUNES,
   SET_DISTRICTS,
   SET_PROVINCES
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