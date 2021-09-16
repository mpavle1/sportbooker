import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

import { logoutUser } from '../../redux/actions/authActions';
import CONST from "../../constants";

const useStyles = makeStyles(() => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const Header = ({ auth, logoutUser }) => {
    const { isAuthenticated, user } = auth;
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
                    to: '/dashboard/profile',
                    component: StyledLink,
                }}
            >
                {user.name}
            </Button>
            {user.type === 'sportCenter' && (
                <Button
                    {...{
                        color: "inherit",
                        to: CONST.navigation.DASHBOARD_URL,
                        component: StyledLink,
                    }}
                >
                    Dashboard
                </Button>
            )}
            <Button
                {...{
                    color: "inherit"
                }}
                onClick={() => logoutUser()}
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
                        to: '/',
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
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Header);

const StyledLink = styled(Link)`
    color: white !important;
    text-decoration: none !important;
`;

const StyledLoggedInButton = styled.div`
    display: inline-block;
`;
