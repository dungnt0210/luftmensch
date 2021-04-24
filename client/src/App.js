import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import customerToken from "./utils/customerToken";

import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignupPage";
import HomePage from './containers/HomePage';
import ProductsPage from './containers/ProductsPage';
import CreateProductPage from './containers/CreateProductPage';
import UpdateProductPage from './containers/UpdateProductPage';
import { logoutCustomer, setCurrentCustomer } from "./actions/customerActions";

if (localStorage.jwtToken) {
   const token = localStorage.jwtToken;
   customerToken(token);
   const decoded = jwt_decode(token);
   store.dispatch(setCurrentCustomer(decoded));
   const currentTime = Date.now() / 1000;
   if (decoded.exp < currentTime) {
      store.dispatch(logoutCustomer());
      window.location.href = "./loginPage";
   }
}

const App = () => {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Switch>
               <Route path="/" exact component={HomePage} />
               <Route path="/list-products" exact component={ProductsPage} />
               <Route path="/create-product" exact component={CreateProductPage} />
               <Route path="/login" component={LoginPage} />
               <Route path="/signup" component={SignUpPage} />
               <Route exact path="/update-product/:id" component={UpdateProductPage} />
               <Redirect from="*" to="/" />
            </Switch>
         </BrowserRouter>
      </Provider>
   );
};

export default App;
