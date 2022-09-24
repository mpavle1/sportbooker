import React from "react";
import { Route, Switch } from "react-router-dom";

import General from "./General";
import Profile from "./Profile";
import Events from "./Events";
import Tickets from "./Tickets";
import Users from "./Users";
import Sports from "./Sports";
import Locations from "./Locations";
import Reviews from "./Reviews";
import PrivateRoute from "../../container/PrivateRoute";
import PageNotFound from "../../components/PageNotFound";

const Dashboard = () => (
  <PrivateRoute>
    <Switch>
      <Route path="/dashboard" exact component={General} />
      <Route path="/dashboard/profile" exact component={Profile} />
      <Route path="/dashboard/events/:eventId?" exact component={Events} />
      <Route path="/dashboard/sports" exact component={Sports} />
      <Route path="/dashboard/locations" exact component={Locations} />
      <Route
        path="/dashboard/tickets/:ticketId?/(change|cancel)?"
        exact
        component={Tickets}
      />
      <Route path="/dashboard/users" exact component={Users} />
      <Route path="/dashboard/reviews" exact component={Reviews} />
      <Route path="*" exact component={PageNotFound} />
    </Switch>
  </PrivateRoute>
);

export default Dashboard;
