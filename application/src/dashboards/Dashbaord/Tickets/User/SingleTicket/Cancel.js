import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

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
    <div>
      <h3>Are you sure you want to cancel this ticket?</h3>
      <div>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</div>{" "}
        <div>
          {format(new Date(date), "PPP")} {startTime} - {endTime}
        </div>
      </div>
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
      <Button variant="contained" color="default" onClick={handleCancelTicket}>
        Cancel Ticket
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push(`/dashboard/tickets/`)}
      >
        Back
      </Button>
    </div>
  );
};

export default Cancel;
