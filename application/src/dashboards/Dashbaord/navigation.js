import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const Navigation = () => {
  const userType = useSelector((state) => state.auth.user.type);

  return (
    <nav>
      <StyledUl>
        {/* <StyledButton>
          <NavLink to="/dashboard" exact activeStyle={{ color: "#3f51b5" }}>
            General
          </NavLink>
        </StyledButton> */}
        {userType !== "user" && (
          <StyledButton>
            <NavLink to="/dashboard/events" activeStyle={{ color: "#3f51b5" }}>
              Events
            </NavLink>
          </StyledButton>
        )}
        {userType !== "sportCenter" && (
          <StyledButton>
            <NavLink to="/dashboard/tickets" activeStyle={{ color: "#3f51b5" }}>
              Tickets
            </NavLink>
          </StyledButton>
        )}
        <StyledButton>
          <NavLink to="/dashboard/profile" activeStyle={{ color: "#3f51b5" }}>
            Profile
          </NavLink>
        </StyledButton>
        {userType === "admin" && (
          <Fragment>
            <StyledButton>
              <NavLink to="/dashboard/users" activeStyle={{ color: "#3f51b5" }}>
                Users
              </NavLink>
            </StyledButton>
            <StyledButton>
              <NavLink
                to="/dashboard/sports"
                activeStyle={{ color: "#3f51b5" }}
              >
                Sports
              </NavLink>
            </StyledButton>
            <StyledButton>
              <NavLink
                to="/dashboard/locations"
                activeStyle={{ color: "#3f51b5" }}
              >
                Locations
              </NavLink>
            </StyledButton>
          </Fragment>
        )}
      </StyledUl>
    </nav>
  );
};

export default Navigation;

const StyledButton = styled(Button)`
  span {
    a {
      color: #333;
      text-decoration: none;
    }
  }
`;

const StyledUl = styled.ul`
  padding: unset;
  border-bottom: 1px solid #777;
`;
