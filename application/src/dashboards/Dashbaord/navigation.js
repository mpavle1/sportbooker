import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navigation = ({ auth }) => {
    const { user } = auth;

    return (
        <nav>
            <ul style={{ padding: 'unset' }}>
                <NavLink to="/dashboard">General</NavLink> {/* paljenje gasenje stadiona itd */}
                <NavLink to="/dashboard/events">Events</NavLink> {/* imamju sport center i user */}
                <NavLink to="/dashboard/profile">Profile</NavLink> {/* imamju sport center i user */}
                {user.type === 'admin' && (
                    <Fragment>
                        <NavLink to="/dashboard/requests">Requests</NavLink> {/* ima admin */}
                        <NavLink to="/dashboard/sports">Manage Sports</NavLink> {/* ima admin */}
                        <NavLink to="/dashboard/locations">Manage Locations</NavLink> {/* ima admin */}
                    </Fragment>
                )}
            </ul>
        </nav>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navigation);