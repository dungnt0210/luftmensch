import { combineReducers } from "redux";
import customerReducers from "./customerReducers";
import productReducers from "./productReducers";
import adminReducers from "./adminReducers";
import categoryReducers from "./categoryReducers";

export default combineReducers({
   customer: customerReducers,
   product: productReducers,
   adminer: adminReducers,
   category: categoryReducers
});
