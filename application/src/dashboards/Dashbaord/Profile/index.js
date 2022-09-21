import React, { useEffect } from "react";
import { connect } from "react-redux";

import withNavigationContainer from "../withNavigationContainer";

import User from "./User";
// import Admin from "./Admin";
import SportCenter from "./SportCenter";

import { getUser } from "../../../redux/actions/auth";
import PageNotFound from "../../../components/PageNotFound";

const Profile = ({ auth, getUser }) => {
  useEffect(() => {
    getUser(auth.user._id);
  }, []);

  switch (auth.user.type) {
    case "user":
      return <User />;
    // case "admin":
    //   return <Admin />;
    case "sportCenter":
      return <SportCenter />;
    default:
      return <PageNotFound />;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUser,
})(withNavigationContainer(Profile));
