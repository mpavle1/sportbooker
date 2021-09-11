import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const Header = () => {
    const { toolbar } = useStyles();
    const { pathname } = useLocation();
    const isLoggedIn = false;

    const getLoggedOutButtons = () => {
        if (pathname !== '/login' && pathname !== '/register' && !isLoggedIn) {
            return (
                <StyledLoggedOutButtons>
                    <Button
                        {...{
                            color: "inherit",
                            to: '/login',
                            component: StyledLink,
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        {...{
                            color: "inherit",
                            to: '/register',
                            component: StyledLink,
                        }}
                    >
                        Register
                    </Button>
                </StyledLoggedOutButtons>
            );
        }

        return null;
    };

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
                {getLoggedOutButtons()}
            </Toolbar>
        );
    };

    return (
        <header>
            <AppBar position="relative">{displayDesktop()}</AppBar>
        </header>
    );
}

export default Header;

const StyledLink = styled(Link)`
    color: white !important;
    text-decoration: none !important;
`;

const StyledLoggedOutButtons = styled.div`
    display: inline-block;
    float: right;
`;