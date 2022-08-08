import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import withNavigationContainer from "../../../withNavigationContainer";

import AllTickets from "./AllTickets";
import SingleTicket from "./SingleTicket";

import { getAllUserTickets } from "../../../../redux/actions/tickets";
import { getAllEvents } from "../../../../redux/actions/events";

const Tickets = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAllUserTickets(user._id));
    dispatch(getAllEvents());
  }, []);

  return (
    <Switch>
      <Route
        path="/dashboard/tickets/:ticketId"
        exact
        component={SingleTicket}
      />
      <Route path="/dashboard/tickets" exact component={AllTickets} />
    </Switch>
  );
};

export default Tickets;
