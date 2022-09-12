import React from "react";
import { Switch, Route } from "react-router-dom";

import Cancel from "./Cancel";
import Change from "./Change";

const SingleTicket = () => {
  return (
    <Switch>
      <Route
        path="/dashboard/tickets/:ticketId/cancel"
        exact
        component={Cancel}
      />
      {/* <Route
        path="/dashboard/tickets/:ticketId/change"
        exact
        component={Change}
      /> */}
    </Switch>
  );
};

export default SingleTicket;
