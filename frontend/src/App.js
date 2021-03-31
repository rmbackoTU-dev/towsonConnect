import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Success from "./components/Success";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/success" component={Success} />
          </Switch>
        </div>
      </Router>
    );
  }
}
