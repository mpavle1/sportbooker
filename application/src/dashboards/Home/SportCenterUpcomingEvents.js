import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

import EventCard from "./EventCard";

import { getSportCenterUpcomingEvents } from "../../redux/actions/events";

const SportCenterUpcomingEvents = ({ sportCenterId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getSportCenterUpcomingEvents(sportCenterId, 10).then((response) => {
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
          Your upcoming events
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
            key={`scupcoming${event._id}`}
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

export default SportCenterUpcomingEvents;
