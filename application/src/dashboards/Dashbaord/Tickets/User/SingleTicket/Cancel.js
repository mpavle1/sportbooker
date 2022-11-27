import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import styled from "styled-components";

import PlaceIcon from "@mui/icons-material/Place";
import StadiumIcon from "@mui/icons-material/Stadium";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import StarIcon from "@mui/icons-material/Star";
import Alert from "@mui/material/Alert";

import { getSportCenter } from "../../../../../redux/actions/auth";
import { cancelATicket } from "../../../../../redux/actions/tickets";

const Cancel = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sports = useSelector((state) => state.sports);
  const locations = useSelector((state) => state.locations);
  const ticket = useSelector((state) => state.tickets.user).find(
    (tick) => tick._id === ticketId
  );
  const event = useSelector((state) => state.events.all).find(
    (event) => event._id === ticket.eventId
  );
  const [sportCenter, setSportCenter] = React.useState(null);

  const { title, description, startTime, endTime, date, sportCenterId } = event;

  useEffect(() => {
    getSportCenter(sportCenterId).then((response) =>
      setSportCenter(response.data)
    );
  }, []);

  if (sportCenter === null) {
    return null;
  }

  const handleCancelTicket = () => {
    if (
      !confirm(
        "Are you sure you want to cancel your ticket? This action cannot be reverted"
      )
    ) {
      return;
    }

    dispatch(cancelATicket(ticketId));
    history.push(`/dashboard/tickets/`);
  };

  return (
    <StyledPageContainer>
      <StyledTitle>Are you sure you want to cancel this ticket?</StyledTitle>
      <div style={{ fontWeight: "bold", fontSize: "20px", margin: "15px 0" }}>
        {title}
      </div>
      <StyledInfoContainer>
        <EventIcon color="primary" /> {format(new Date(date), "PPP")}{" "}
        {startTime} - {endTime}
      </StyledInfoContainer>
      <StyledInfoContainer>
        <StadiumIcon /> {sportCenter.user.name}
      </StyledInfoContainer>
      <StyledInfoContainer>
        <PlaceIcon color="error" />{" "}
        {locations.find((location) => location._id === event.locationId).name}
      </StyledInfoContainer>
      <StyledInfoContainer>
        <SportsHandballIcon color="success" />{" "}
        {sports.find((sport) => sport._id === event.sportId).name}
      </StyledInfoContainer>
      <StyledInfoContainer>
        <EventSeatRoundedIcon />

        <div>
          <div>
            stand: {ticket.stand} section: {ticket.section}
          </div>
          <div>
            row: {ticket.seat.row} column: {ticket.seat.column}
          </div>
        </div>
      </StyledInfoContainer>
      <div style={{ margin: "10px 0", width: "500px" }}>{description}</div>
      <ButtonContainer>
        <Button
          variant="contained"
          color="default"
          onClick={handleCancelTicket}
        >
          Cancel Ticket
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/event/${event._id}`)}
        >
          View this event
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/dashboard/tickets/`)}
        >
          Back
        </Button>
      </ButtonContainer>
    </StyledPageContainer>
  );
};

export default Cancel;

const StyledInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
