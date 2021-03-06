import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";
import { NotFound } from "../pages/404";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route>
          <NotFound /> 
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
