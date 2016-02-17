import React from "react";
import { render } from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { syncReduxAndRouter } from "redux-simple-router";

import {configureStore} from "./store";
import history from "./history";

import "../public/js/bootstrap.min.js";
import "../public/css/styles.css";

var routes = {
  component: "div",
  childRoutes: [{
    path: "/",
    component: require("./App.jsx"),
  }],
};

var store = configureStore();
syncReduxAndRouter(history, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
  document.getElementById("react")
);
