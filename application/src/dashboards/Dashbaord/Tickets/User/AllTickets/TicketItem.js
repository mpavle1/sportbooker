import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import { getSportCenter } from "../../../../../redux/actions/auth";

const TicketItem = ({ ticket }) => {
  const events = useSelector((state) => state.events.all);
  const sports = useSelector((state) => state.sports);
  const locations = useSelector((state) => state.locations);
  const event = events.find((event) => event._id === ticket.eventId);
  const [sportCenter, setSportCenter] = React.useState({});

  const { title, description, startTime, endTime, date, sportCenterId } = event;

  useEffect(() => {
    getSportCenter(sportCenterId).then((response) =>
      setSportCenter(response.data)
    );
  }, []);

  if (Object.values(sportCenter).length === 0) {
    return null;
  }

  return (
    <StyledEventItem>
      <StyledHeader>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</span>{" "}
        <span>
          {format(new Date(date), "PPP")} {startTime} - {endTime}
        </span>
      </StyledHeader>
      <div>
        <div>{sportCenter.user.name}</div>
        <div>
          {locations.find((location) => location._id === event.locationId).name}
        </div>
        <div>{sports.find((sport) => sport._id === event.sportId).name}</div>
        <div>
          stand: {ticket.stand} section: {ticket.section}
        </div>
        <div>
          row: {ticket.seat.row} column: {ticket.seat.column}
        </div>
        <div style={{ margin: "10px 0" }}>{description}</div>
      </div>
      <StyledButtonContainer>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => console.log("cancel")}
        >
          Cancel Ticket
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => console.log("change")}
        >
          Change Ticket
        </Button>
      </StyledButtonContainer>
    </StyledEventItem>
  );
};

export default TicketItem;

const StyledEventItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
  width: 600px;
  margin-bottom: 10px;
  padding: 15px;
  position: relative;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
