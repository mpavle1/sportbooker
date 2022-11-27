import React, { useEffect, useState } from "react";
import EventCard from "../EventCard";
import Alert from "@mui/material/Alert";

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
        }}
      >
        <Alert
          severity="warning"
          sx={{
            fontWeight: "bold",
          }}
        >
          Don't forget, You have reserved tickets for these upcoming events
        </Alert>
      </div>
      <div
        style={{
          overflow: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {events.map((event) => (
          <div
            key={`userupcoming${event._id}`}
            style={{
              display: "inline-block",
              marginRight: "20px",
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
