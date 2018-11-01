import React from "react";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import Home from "./components/home";
import { browserHistory } from "./browser-history";

const Router = () => (
  <BrowserRouter history={browserHistory}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/asdf" component={Home}/>
    </div>
  </BrowserRouter>

);


export default Router;
