import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import withNavigationContainer from "../withNavigationContainer";

import Admin from "./Admin";
import SportCenter from "./SportCenter";
import User from "./User";
import PageNotFound from "../../../components/PageNotFound";

import { fetchSports } from "../../../redux/features/sports";
import { fetchLocations } from "../../../redux/features/locations";
import { getAllSportCenters } from "../../../redux/actions/sportCenters";
import { getAllUsers } from "../../../redux/actions/users";

const Events = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.user.type);

  useEffect(() => {
    dispatch(fetchSports());
    dispatch(fetchLocations());
    dispatch(getAllSportCenters());
    dispatch(getAllUsers());
  }, []);

  switch (userType) {
    case "admin":
      return <Admin />;
    case "sportCenter":
      return <SportCenter />;
    case "user":
      return <User />;
    default:
      return <PageNotFound />;
  }
};

export default withNavigationContainer(Events);
