import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import styled from "styled-components";

import TicketItem from "./TicketItem";

import { getAllSports } from "../../../../../redux/actions/sports";
import { getAllLocations } from "../../../../../redux/actions/locations";

function compare(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

const AllTickets = () => {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.all);
  const allTickets = useSelector((state) => state.tickets.user);
  const [currentFilter, setCurrentFilter] = useState("upcoming");


  useEffect(() => {
    dispatch(getAllSports());
    dispatch(getAllLocations());
  }, []);

  if (events.length === 0) {
    return null;
  }

  const upcomingTickets = allTickets.filter((ticket) => {
    const ticketEvent = events.find((event) => event._id === ticket.eventId);

    return moment(ticketEvent.date).isAfter(new Date());
  });

  if (events.length === 0) {
    return null;
  }

  const getTickets = () => {
    if (currentFilter === "all") {
      return allTickets;
    }
    return upcomingTickets;
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <h1>Tickets for booked Events</h1>
      <StyledButtonContainer>
        <Button
          variant="contained"
          color={currentFilter === "upcoming" ? "primary" : "info"}
          type="button"
          onClick={() => setCurrentFilter("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant="contained"
          color={currentFilter === "all" ? "primary" : "info"}
          type="button"
          onClick={() => setCurrentFilter("all")}
        >
          All
        </Button>
      </StyledButtonContainer>
      {getTickets()
        .sort(compare)
        .map((ticket) => {
          return <TicketItem key={ticket._id} ticket={ticket} />;
        })}
    </div>
  );
};

export default AllTickets;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
`;
