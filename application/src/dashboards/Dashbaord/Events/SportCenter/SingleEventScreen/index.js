import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from "moment";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { format } from "date-fns";

import PlaceIcon from "@mui/icons-material/Place";
import StadiumIcon from "@mui/icons-material/Stadium";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import StarIcon from "@mui/icons-material/Star";
import Alert from "@mui/material/Alert";

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
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Information for event:
        </div>
      </StyledTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "500px",
            marginTop: "30px",
          }}
        >
          <StyledEventInfo>{event.title}</StyledEventInfo>
          <StyledEventInfo>
            <EventIcon color="primary" /> {format(new Date(event.date), "PPP")}
          </StyledEventInfo>
          <StyledEventInfo>
            <AccessTimeIcon /> {event.startTime} - {event.endTime}
          </StyledEventInfo>
          <StyledEventInfo>
            <SportsHandballIcon color="success" />{" "}
            {sports.find((sport) => sport._id === event.sportId)?.name}
          </StyledEventInfo>
          <StyledEventInfo>
            <EventSeatRoundedIcon /> Booked tickets: {tickets.length} /{" "}
            {sportCenter.capacity}
          </StyledEventInfo>
          <div>{event.description}</div>
        </div>
        <div>
          <Button
            type="button"
            onClick={() => setIsEditModalVisible(true)}
            variant="contained"
            color="primary"
          >
            Edit event
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => setIsModalVisible(true)}
            style={{
              marginLeft: "50px",
            }}
          >
            Open stadium view
          </Button>
        </div>
      </div>
      <br />
      <ViewStadium
        isVisible={isModalVisible}
        handleCloseModal={setIsModalVisible}
        stadium={sportCenter.stadium}
      />
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

const StyledEventInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
