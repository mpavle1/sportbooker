import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import AddEventModal from './AddEventModal';

import { getAllEventsForUser } from "../../../../redux/actions/events";

const SportCenter = ({ getAllEventsForUser, user }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getAllEventsForUser(user.id);
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => setIsModalVisible(true)}
            >
                Add Event
            </Button>
            <h2>All events</h2>
            <div>qwe</div>
            <div>123</div>
            <div>234</div>
            <AddEventModal isVisible={isModalVisible} handleSetVisible={setIsModalVisible} />
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    {
        getAllEventsForUser
    }
)(SportCenter);
