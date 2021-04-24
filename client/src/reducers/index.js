import { combineReducers } from "redux";
import customerReducers from "./customerReducers";
import productReducers from "./productReducers";

export default combineReducers({
   customer: customerReducers,
   product: productReducers
});
