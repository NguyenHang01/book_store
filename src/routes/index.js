import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}home`}
        component={asyncComponent(() => import("./HomePage"))}
      />
      <Route
        path={`${match.url}book/:id`}
        component={asyncComponent(() => import("./Book"))}
      />
    </Switch>
  </div>
);

export default App;
