import React, { Fragment } from "react";

import Navigation from "./navigation";

export default function withNavigationContainer(WrappedComponent) {
  const Dashboard = (props) => {
    return (
      <Fragment>
        <Navigation />
        <WrappedComponent {...props} />
      </Fragment>
    );
  };

  return Dashboard;
}
