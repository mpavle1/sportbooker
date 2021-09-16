import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({children, auth}) => {
    if (auth.isAuthenticated) {
        return (
            <Fragment>
                {children}
            </Fragment>
        );
    }

    return <Redirect to="/login" />;
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);