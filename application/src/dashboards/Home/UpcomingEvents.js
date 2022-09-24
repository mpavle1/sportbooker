import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

import EventCard from "./EventCard";

import { getUpcomingPopularEvents } from "../../redux/actions/events";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUpcomingPopularEvents(10).then((response) => {
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
        <Alert severity="info" sx={{ fontWeight: "bold" }}>
          Most popular upcoming events
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
            key={`upcoming${event._id}`}
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

export default UpcomingEvents;
