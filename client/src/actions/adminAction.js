import axios from "axios";
import adminToken from "../utils/adminToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_ADMIN, TOGGLE_ADMIN_LOADING} from "./types";

export const createAdmin = (data, history) => dispatch => {
   dispatch(toggleAdminLoading());
   axios
      .post("/api/admin/create", data)
      .then(res => {
         dispatch(toggleAdminLoading());
         history.push("/admin");
      })
      .catch(err => {
         dispatch(toggleAdminLoading());
      });
};

export const loginAdmin = data => dispatch => {
   dispatch(toggleAdminLoading());
   axios
      .post("/api/admin/login", data)
      .then(res => {
         const { token } = res.data;
         localStorage.setItem("jwtToken", token);
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

export const logoutAdmin = () => dispatch => {
   adminToken(false);
   dispatch(setCurrentAdmin({}));
};
