import React from "react";
import { useSelector } from "react-redux";

import withNavigationContainer from "../withNavigationContainer";

import User from "./User";
import Admin from "./Admin";

const Tickets = () => {
  const userType = useSelector((state) => state.auth.user.type);
  switch (userType) {
    case "user":
      return <User />;
    case "admin":
      return <Admin />;
  }
};

export default withNavigationContainer(Tickets);
