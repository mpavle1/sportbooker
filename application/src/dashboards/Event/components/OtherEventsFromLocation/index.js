import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../EventCard";
import Alert from "@mui/material/Alert";

import { getOtherEventsForLocation } from "../../../../redux/actions/events";

const EventsFromSc = ({ sportCenterId, locationId, location }) => {
  const [events, setEvents] = useState([]);

  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);

  if (!sportCenters || !users) {
    return null;
  }

  const sportCenter = sportCenters.find((sc) => sc._id === sportCenterId);
  const user = users.find((u) => u._id === sportCenter.userId);

  useEffect(() => {
    getOtherEventsForLocation(sportCenterId, locationId, 10).then(
      (response) => {
        setEvents([...response.data]);
      }
    );
  }, []);

  if (events.length === 0) {
    return null;
  }

  {
    /* <div
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
          ></div> */
  }

  return (
    <div style={{ paddingBottom: "20px" }}>
      <div
        style={{
          margin: "20px 0",
          width: "fit-content",
        }}
      >
        <Alert
          severity="info"
          sx={{
            fontWeight: "bold"
          }}
        >
          Other events from {location}
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

export default EventsFromSc;
