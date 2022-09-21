import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../EventCard";

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

  return (
    <div style={{ paddingBottom: "20px" }}>
      <div
        style={{
          margin: "20px 0",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Other events from {location}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsFromSc;
