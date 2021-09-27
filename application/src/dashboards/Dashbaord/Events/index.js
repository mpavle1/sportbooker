import React from 'react';
import { connect } from 'react-redux';

import withNavigationContainer from '../withNavigationContainer';

import User from './User';
import Admin from './Admin';
import SportCenter from './SportCenter';

const Events = ({ auth }) => {
    switch(auth.user.type) {
        case 'user': return <User />;
        case 'admin': return <Admin />;
        case 'sportCenter': return <SportCenter />;
    }    
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(withNavigationContainer(Events));
