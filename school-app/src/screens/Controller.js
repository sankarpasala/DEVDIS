import React, { Component } from "react";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Students from "./students/Students";
import Overview from "./overview/Overview";
import Messages from "./messages/Messages";

class Controller extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://api.instagram.com/v1/";
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    };
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Switch>
            <Route
              exact
              path="/home"
              render={props =>
                sessionStorage.getItem("access-token") === null ? (
                  <Login {...props} baseUrl={this.baseUrl} />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              exact
              path="/profile"
              render={props =>
                sessionStorage.getItem("access-token") === null ? (
                  <Login {...props} baseUrl={this.baseUrl} />
                ) : (
                  <Profile />
                )
              }
            />
            <Route
              exact
              path="/students"
              render={props =>
                sessionStorage.getItem("access-token") === null ? (
                  <Login {...props} baseUrl={this.baseUrl} />
                ) : (
                  <Students />
                )
              }
            />

            <Route
              exact
              path="/overview"
              render={props =>
                sessionStorage.getItem("access-token") === null ? (
                  <Login {...props} baseUrl={this.baseUrl} />
                ) : (
                  <Overview />
                )
              }
            />
             <Route
              exact
              path="/messages"
              render={props =>
                sessionStorage.getItem("access-token") === null ? (
                  <Login {...props} baseUrl={this.baseUrl} />
                ) : (
                  <Messages />
                )
              }
            />
            <Route
              exact
              path="/"
              render={props =>
                sessionStorage.getItem("access-token") === null ? (
                  <Login {...props} baseUrl={this.baseUrl} />
                ) : (
                  <Home />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Controller;
