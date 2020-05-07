import React from "react";
import { Route, Switch } from "react-router-dom";
import DetailSachBanChay from "./ListBook/DetailSachBanChay"
import asyncComponent from "util/asyncComponent";
import BookGridGetBy from "./ListBook/BookGridGetBy";


const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}home`}
        exact
        component={asyncComponent(() => import("./HomePage"))}
      />
      <Route
        path={`${match.url}book/:id`}
        component={asyncComponent(() => import("./Book"))}
      />
      <Route
        path={`${match.url}ban_chay`}
        component={DetailSachBanChay}
      />
      <Route
        path={`${match.url}:by/:id`}
        component={BookGridGetBy}
      />
      <Route
        path={`${match.url}:by/:id`}
        component={BookGridGetBy}
      />
      <Route
        path={`${match.url}card`}
        component={asyncComponent(() => import("./ListCart"))}
      />


    </Switch>
  </div>
);

export default App;
