import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from "moment";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

import ViewStadium from "./ViewStadium";
import TicketItem from "./TicketItem";
import EditModal from "../../../../../components/EventModal";

import { getAllEventTickets } from "../../../../../redux/actions/tickets";
import { getAllUsers } from "../../../../../redux/actions/users";

const SingleEventScreen = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) =>
    state?.events?.user?.find((singleEvent) => singleEvent._id === eventId)
  );
  const sportCenter = useSelector((state) => state?.auth?.sportCenter);
  const tickets = useSelector((state) => state.tickets.event);
  const sports = useSelector((state) => state?.sports);
  const users = useSelector((state) => state.users.users);
  const isInitializedUsers = useSelector((state) => state.users.isInitialized);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [filteredTicketId, setFilteredTicketId] = useState("");

  useEffect(() => {
    dispatch(getAllEventTickets(eventId));
    dispatch(getAllUsers());
  }, []);

  if (!event || sports.length === 0 || !isInitializedUsers) {
    return null;
  }

  const handleFilterInput = () => {
    return tickets.filter((ticket) => ticket._id.includes(filteredTicketId));
  };

  return (
    <div>
      <StyledTitle>
        <div>Information for event:</div>
        <Button
          type="button"
          onClick={() => setIsEditModalVisible(true)}
          variant="contained"
          color="primary"
        >
          Edit event
        </Button>
      </StyledTitle>
      <h3>{event.title}</h3>
      <div>{moment(event.date).format("MMMM Do YYYY")}</div>
      <div>
        {event.startTime} - {event.endTime}
      </div>
      <div>{sports.find((sport) => sport._id === event.sportId)?.name}</div>
      <br />
      <div>{event.description}</div>
      <br />
      <div>
        Booked tickets: {tickets.length} / {sportCenter.capacity}
      </div>
      <br />
      <ViewStadium
        isVisible={isModalVisible}
        handleCloseModal={setIsModalVisible}
        stadium={sportCenter.stadium}
      />
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => setIsModalVisible(true)}
      >
        Open stadium view
      </Button>
      {isEditModalVisible && (
        <EditModal
          event={event}
          onClose={() => setIsEditModalVisible(false)}
          onChange={() => {
            alert("Event has been updated");
            setIsEditModalVisible(false);
          }}
        />
      )}
      <h2>Tickets for this event:</h2>
      <StyledTextInputContainer>
        <TextField
          value={filteredTicketId}
          onChange={(event) => setFilteredTicketId(event.target.value)}
          placeholder="Ticket ID"
          fullWidth
        />
      </StyledTextInputContainer>
      <br />
      <div>
        {handleFilterInput().map((ticket) => (
          <TicketItem
            ticket={ticket}
            user={users.find((user) => user._id === ticket.userId)}
            key={ticket._id}
          />
        ))}
      </div>
      <br />
    </div>
  );
};

export default SingleEventScreen;

const StyledTextInputContainer = styled.div`
  margin-bottom: 10px;
  width: 450px;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
