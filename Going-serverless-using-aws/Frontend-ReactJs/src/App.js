import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/Login/newpasswordreq";
import SignUp from "./pages/SignUp";
import ChangePassword from "./pages/ChangePassword";
import { ROUTES_PATH } from "./constants";
import { connect } from "react-redux";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={ROUTES_PATH.LOGIN} component={Login} />
        <Route path={ROUTES_PATH.SIGNUP} component={SignUp} />
        <Route path={ROUTES_PATH.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={ROUTES_PATH.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES_PATH.NEW_PASSWORD} component={NewPassword} />
        <Redirect exact path={"*"} to={ROUTES_PATH.LOGIN} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={ROUTES_PATH.HOME} component={Home} />
          <Route
            path={ROUTES_PATH.CHANGE_PASSWORD}
            component={ChangePassword}
          />
          <Redirect exact path={"*"} to={ROUTES_PATH.HOME} />
        </Switch>
      );
    }

    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  if (state.user.profile) {
    try {
      return {
        isAuthenticated: state.user.profile.accessToken ? true : false,
        user: state.user.profile
      };
    } catch (e) {
      return {
        isAuthenticated: false,
        user: state.user.profile
      };
    }
  }
};
export default withRouter(connect(mapStateToProps)(App));
