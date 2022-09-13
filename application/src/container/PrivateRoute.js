import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Fragment>{children}</Fragment>;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
