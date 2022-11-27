import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import withNavigationContainer from "../withNavigationContainer";

import Admin from "./Admin";
import SportCenter from "./SportCenter";

import { fetchSports } from "../../../redux/features/sports";
import { getAllLocations } from "../../../redux/actions/locations";

const Events = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.user.type);

  useEffect(() => {
    dispatch(fetchSports());
    dispatch(getAllLocations());
  }, []);

  switch (userType) {
    case "admin":
      return <Admin />;
    case "sportCenter":
      return <SportCenter />;
  }
};

export default withNavigationContainer(Events);
