import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AllTickets from "./AllTickets";
import SingleTicket from "./SingleTicket";

import { getAllUserTickets } from "../../../../redux/actions/tickets";
import { getAllEvents } from "../../../../redux/actions/events";
import { fetchLocations } from "../../../../redux/features/locations";
import { fetchSports } from "../../../../redux/features/sports";

const Tickets = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isEventsInitialized = useSelector(
    (state) => state.events.isInitialized
  );

  useEffect(() => {
    dispatch(getAllUserTickets(user._id));
    dispatch(getAllEvents());
    dispatch(fetchSports());
    dispatch(fetchLocations());
  }, []);

  if (!isEventsInitialized) {
    return null;
  }

  return (
    <Switch>
      <Route
        path="/dashboard/tickets/:ticketId/(change|cancel)"
        exact
        component={SingleTicket}
      />
      <Route path="/dashboard/tickets" exact component={AllTickets} />
    </Switch>
  );
};

export default Tickets;
