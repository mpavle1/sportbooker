import React, { useEffect, useState } from "react";
import EventCard from "../EventCard";

import { getUpcomingEventsForUser } from "../../../redux/actions/events";

const YourUpcomingEvents = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUpcomingEventsForUser(user._id, 10).then((response) => {
      setEvents([...response.data]);
    });
  }, []);

  if (events.length === 0) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          margin: "20px 0",
          fontWeight: "bold",
          fontSize: "20px"
        }}
      >
        Don't forget, you have reserved tickets for these upcoming events
      </div>
      <div
        style={{
            overflow: 'auto',
            whiteSpace: 'nowrap'
        }}
      >
        {events.map((event) => (
          <div
            style={{
              display: "inline-block",
              marginRight: '20px'
            }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourUpcomingEvents;
