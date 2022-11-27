import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AllEventScreen from "./AllEventScreen";
import SingleEventScreen from "./SingleEventScreen";

import { getAllEventsForSportCenter } from "../../../../redux/actions/events";
import { fetchSports } from "../../../../redux/features/sports";
import { getAllLocations } from "../../../../redux/actions/locations";
import { getAllSportCenters } from "../../../../redux/actions/sportCenters";

const Events = () => {
  const dispatch = useDispatch();
  const sportCenter = useSelector((state) => state.auth.sportCenter);

  useEffect(() => {
    dispatch(fetchSports());
    dispatch(getAllLocations());
    dispatch(getAllSportCenters());
    dispatch(getAllEventsForSportCenter(sportCenter._id));
  }, []);

  return (
    <Switch>
      <Route
        path="/dashboard/events/:eventId"
        exact
        component={SingleEventScreen}
      />
      <Route path="/dashboard/events" exact component={AllEventScreen} />
    </Switch>
  );
};

export default Events;
