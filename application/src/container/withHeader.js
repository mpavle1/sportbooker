import React, { Fragment } from "react";
import Header from "../components/Header";

const withHeader = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default withHeader;
