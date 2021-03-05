import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { AddMenu } from "../pages/owner/add-menu";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

//switchはchildとしてrouteしか持つ事ができない、だがClientRoutesはfragment <></>をreturnするからエラーになる。
//直し方は簡単arrayに変える。
// const ClientRoutes = [
//   <Route key={1} path="/" exact>
//     <Restaurants />
//   </Route>,
//   <Route key={2} path="/confirm">
//     <ConfirmEmail />
//   </Route>,
//   <Route key={3} path="/edit-profile">
//     <EditProfile />
//   </Route>,
//   <Route key={4} path="/search">
//     <Search />
//   </Route>,
//   <Route key={5} path="/category/:slug">
//     <Category />
//   </Route>,
//   <Route key={6} path="/restaurant/:id">
//     <Restaurant />
//   </Route>,
// ];

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurant/:id",
    component: <Restaurant />,
  },
];

const commonRoutes = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
];

const restaurantRoutes = [
  {
    path: "/",
    component: <MyRestaurants />,
  },
  {
    path: "/add-restaurant",
    component: <AddRestaurant />,
  },
  {
    path: "/restaurant/:id",
    component: <MyRestaurant />,
  },
  {
    path: "/restaurant/:id/add-dish",
    component: <AddMenu />,
  },
];

const LoggedInRouter = () => {
  const { data, error, loading } = useMe();
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
        {/* restaurant */}
        {data.me.role === "Owner" &&
          restaurantRoutes.map(({ path, component }) => (
            <Route exact path={path} key={path}>
              {component}
            </Route>
          ))}
        {/* common */}
        {commonRoutes.map(({ path, component }) => (
          <Route exact path={path} key={path}>
            {component}
          </Route>
        ))}
        {/* client */}
        {data.me.role === "Client" &&
          clientRoutes.map(({ path, component }) => (
            <Route exact path={path} key={path}>
              {component}
            </Route>
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
