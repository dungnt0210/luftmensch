import { combineReducers } from "redux";
import customerReducers from "./customerReducers";
import productReducers from "./productReducers";
import adminReducers from "./adminReducers";
import categoryReducers from "./categoryReducers";
import globalReducers from "./globalReducers";
import addressReducers from "./addressReducers";


export default combineReducers({
   customer: customerReducers,
   product: productReducers,
   adminer: adminReducers,
   category: categoryReducers,
   global: globalReducers,
   addressData: addressReducers
});
