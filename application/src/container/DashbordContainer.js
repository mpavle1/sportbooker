import React from "react";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";

const DashboardContainer = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  return <Container fixed={user.type !== "admin"}>{children}</Container>;
};

export default DashboardContainer;
