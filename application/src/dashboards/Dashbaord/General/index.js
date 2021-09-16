import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import withNavigationContainer from '../withNavigationContainer';

import { isSportCenterComplete } from '../../../utils/validators/sportCenter';

const General = ({ auth }) => {
    const { user, sportCenter } = auth;

    const renderUser = () => (
        <div>User</div>
    );

    const renderAdmin = () => (
        <div>Admin</div>
    );

    const renderSportCenter = () => {
        if (!isSportCenterComplete(sportCenter)) {
            return (
                <div>
                    SportCenter is not complete. If you want to events, please finish your profile.
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            {...{
                                to: `dashboard/profile`,
                                component: StyledLink,
                            }}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div>SportCenter</div>
        );
    };


    switch (user.type) {
        case 'user': return renderUser();
        case 'admin': return renderAdmin();
        case 'sportCenter': return renderSportCenter();
    }
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(withNavigationContainer(General));

const StyledLink = styled(Link)`
    // color: white !important;
    text-decoration: none !important;
`;