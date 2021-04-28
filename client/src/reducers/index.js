import { combineReducers } from "redux";
import customerReducers from "./customerReducers";
import productReducers from "./productReducers";
import adminReducers from "./adminReducers";

export default combineReducers({
   customer: customerReducers,
   product: productReducers,
   adminer: adminReducers
});
