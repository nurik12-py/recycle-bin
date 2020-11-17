import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import History from "./views/History";
import Settings from "./views/Settings";
import Login from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends React.Component {
  render() {
    return (<Router>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/history/:id" component={History} />
        <ProtectedRoute path="/history" component={History} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </Router>);
  }
}

export default App;
