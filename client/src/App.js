import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AdminLogin from "./containers/admin/AdminLogin";
import Dashboard from "./containers/admin/Dashboard";
import Main from './Main';

const App = () => {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Switch>
               <Route exact path="/admin/login" component={AdminLogin} />
               <Route path="/admin" component={Dashboard} />
               <Route path="/" component={Main} />
               <Redirect from="*" to="/" />
            </Switch>
         </BrowserRouter>
      </Provider>
   );
};

export default App;
