import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";

import AddEventModal from "./AddEventModal";
import EventItem from "./EventItem";

function compare(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

const AllEventScreen = () => {
  const events = useSelector((state) => state.events.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("upcoming");

  const getEvents = () => {
    if (currentFilter === "all") {
      return events;
    }
    return events.filter((event) => moment(event.date).isAfter(new Date()));
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
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
      <StyledButtonContainer>
        <Button
          variant="contained"
          color={currentFilter === "upcoming" ? "primary" : "default"}
          type="button"
          onClick={() => setCurrentFilter("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant="contained"
          color={currentFilter === "all" ? "primary" : "default"}
          type="button"
          onClick={() => setCurrentFilter("all")}
        >
          All
        </Button>
      </StyledButtonContainer>
      {getEvents()
        .sort(compare)
        .map((event) => (
          <EventItem key={event.title} event={event} />
        ))}
      <AddEventModal
        isVisible={isModalVisible}
        handleSetVisible={setIsModalVisible}
      />
    </div>
  );
};

export default AllEventScreen;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
`;
