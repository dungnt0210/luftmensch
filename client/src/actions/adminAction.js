import axios from "axios";
import adminToken from "../utils/adminToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_ADMIN, 
   TOGGLE_ADMIN_LOADING, 
   LIST_ADMIN , 
   TOGGLE_ADMINS_LOADING,
   CREATE_ADMIN,
   DELETE_ADMIN,
   UPDATE_ADMIN
} from "./types";

export const createAdmin = (data, history) => dispatch => {
   dispatch(toggleAdminsLoading());
   axios
      .post("/api/admin/create", data)
      .then(res => {
         dispatch({
            type: CREATE_ADMIN,
            payload: res.data
         });
         dispatch(toggleAdminsLoading());
         history.push('/admin/dashboard/list-admin');
      })
      .catch(err => {
         dispatch(toggleAdminsLoading());
      });
};

export const listAdmin = () => dispatch => {
   dispatch(toggleAdminsLoading());
   axios
      .get("/api/admin")
      .then(res => {
         dispatch({
            type: LIST_ADMIN,
            payload: res.data
         });
         dispatch(toggleAdminsLoading());
      })
      .catch(err => {
         dispatch(toggleAdminsLoading());
      });
};

export const deleteAdmin = (id) => dispatch => {
   dispatch(toggleAdminsLoading());
   axios
      .delete(`/api/admin/delete/${id}`)
      .then(res => {
         dispatch({
            type: DELETE_ADMIN,
            payload: id
         });
         dispatch(toggleAdminsLoading());
      })
      .catch(err => {
         dispatch(toggleAdminsLoading());
      });
};

export const updateAdmin = (id, data) => dispatch => {
   dispatch(toggleAdminsLoading());
   axios
      .patch(`/api/admin/update/${id}`, data)
      .then(res => {
         dispatch({
            type: UPDATE_ADMIN,
            payload: res.data
         });
         dispatch(toggleAdminsLoading());
      })
      .catch(err => {
         dispatch(toggleAdminsLoading());
      });
};

export const loginAdmin = (data) => dispatch => {
   dispatch(toggleAdminLoading());
   axios
      .post("/api/admin/login", data)
      .then(res => {
         const { token } = res.data;
         adminToken(token);
         const decoded = jwt_decode(token);
         dispatch(setCurrentAdmin(decoded));
         dispatch(toggleAdminLoading());
      })
      .catch(err => {
        console.log(err);
         dispatch(toggleAdminLoading());
      });
};

export const setCurrentAdmin = data => {
   return {
      type: SET_CURRENT_ADMIN,
      payload: data
   };
};

export const toggleAdminLoading = () => {
   return {
      type: TOGGLE_ADMIN_LOADING
   };
};

export const toggleAdminsLoading = () => {
   return {
      type: TOGGLE_ADMINS_LOADING
   };
};

export const logoutAdmin = () => dispatch => {
   adminToken(false);
   dispatch(setCurrentAdmin({}));
};
