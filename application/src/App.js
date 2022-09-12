import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import axios from "axios";

import {
  setCurrentUser,
  logoutUser,
  setCurrentSportCenter,
} from "./redux/actions/auth";
import store from "./redux/store";

import Header from './components/Header';
import withHeader from './container/withHeader';
import DashboardContainer from "./container/DashbordContainer";

import setAuthToken from "./utils/auth/setAuthToken";
import routes from "./routes";

axios.defaults.baseURL = "http://localhost:5000";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded.user));
  if (decoded.user.type === "sportCenter") {
    store.dispatch(setCurrentSportCenter(decoded.sportCenter));
  } else {
    store.dispatch(setCurrentSportCenter({}));
  }
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => (
  <Provider store={store}>
    <Router initialEntries={['/']}>
      <Header />
      <DashboardContainer>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </DashboardContainer>
    </Router>
  </Provider>
);

export default App;
