import React from "react";
import styled from "styled-components";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import { logoutUser } from "../../redux/actions/auth";
import CONST from "../../constants";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { toolbar } = useStyles();
  const { pathname } = useLocation();

  const getLoggedOutButtons = () => (
    <StyledLoggedInButton>
      {pathname !== CONST.navigation.LOGIN_URL && (
        <Button
          {...{
            color: "inherit",
            to: CONST.navigation.LOGIN_URL,
            component: StyledLink,
          }}
        >
          Login
        </Button>
      )}
      {pathname !== CONST.navigation.REGISTER_URL && (
        <Button
          {...{
            color: "inherit",
            to: CONST.navigation.REGISTER_URL,
            component: StyledLink,
          }}
        >
          Register
        </Button>
      )}
    </StyledLoggedInButton>
  );

  const getLoggedInButtons = () => (
    <div>
      <Button
        {...{
          color: "inherit",
        }}
        onClick={() => {
          history.push(`/dashboard/profile`);
        }}
      >
        {user.name}
      </Button>
      {/* {user.type !== "user" && (
        <Button
          {...{
            color: "inherit",
          }}
          onClick={() => {
            history.push(`/dashboard`);
          }}
        >
          Dashboard
        </Button>
      )} */}
      <Button
        {...{
          color: "inherit",
        }}
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </Button>
    </div>
  );

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <Button
          {...{
            color: "inherit",
            to: "/",
            component: StyledLink,
          }}
        >
          SportBooker
        </Button>
        {isAuthenticated ? getLoggedInButtons() : getLoggedOutButtons()}
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar position="relative">{displayDesktop()}</AppBar>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default Header;

const StyledLink = styled(NavLink)`
  color: white !important;
  text-decoration: none !important;
`;

const StyledLoggedInButton = styled.div`
  display: inline-block;
`;
