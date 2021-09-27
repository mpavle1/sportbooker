import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import AddEventModal from './AddEventModal';
import EventItem from './EventItem';

import { getAllEventsForUser } from "../../../../redux/actions/events";

function compare( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }

const SportCenter = ({ getAllEventsForUser, sportCenter, events }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getAllEventsForUser(sportCenter._id);
    }, []);

    return (
        <div style={{ paddingBottom: '50px'}}>
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
            {events.sort(compare).map((event) => <EventItem key={event.title} event={event}/>)}
            <AddEventModal isVisible={isModalVisible} handleSetVisible={setIsModalVisible} />
        </div>
    );
}

const mapStateToProps = state => ({
    sportCenter: state.auth.sportCenter,
    events: state.events.user
});

export default connect(
    mapStateToProps,
    {
        getAllEventsForUser
    }
)(SportCenter);
