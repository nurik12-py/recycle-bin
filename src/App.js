import React from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
class App extends React.Component {
  render() {
    return (<Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>);
  }
}

export default App;
