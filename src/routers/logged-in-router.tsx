import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Header } from "../components/header";
import { Restaurants } from "../pages/client/restaurants";
import { meQuery } from "../__generated__/meQuery";

//switchはchildとしてrouteしか持つ事ができない、だがClientRoutesはfragment <></>をreturnするからエラーになる。
//直し方は簡単arrayし変える。
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-2xl">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
