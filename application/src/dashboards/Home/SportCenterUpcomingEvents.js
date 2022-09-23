import React, { useEffect, useState } from "react";

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
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Your upcoming events
      </div>
      <div
        style={{
          overflow: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {events.map((event) => (
          <div
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
