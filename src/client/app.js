import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "../registerServiceWorker";
import Router from "./router";
import { createStore, Provider } from "./my-redux";
import { reducer } from "./reducers";
import { initialState } from "./reducers/initial-state";

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
const store = createStore(reducer, initialState);

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

/* global document */
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
