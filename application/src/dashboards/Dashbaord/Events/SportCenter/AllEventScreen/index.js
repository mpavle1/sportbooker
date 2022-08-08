import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import AddEventModal from './AddEventModal';
import EventItem from './EventItem';

function compare( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }

const AllEventScreen = () => {
    const events = useSelector((state) => state.events.user);
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div style={{ paddingBottom: '50px'}}>
            <h1>Events</h1>
            <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => setIsModalVisible(true)}
            >
                Add new Event
            </Button>
            <h2>All events</h2>
            {events.sort(compare).map((event) => <EventItem key={event.title} event={event}/>)}
            <AddEventModal isVisible={isModalVisible} handleSetVisible={setIsModalVisible} />
        </div>
    );
}

export default AllEventScreen;
