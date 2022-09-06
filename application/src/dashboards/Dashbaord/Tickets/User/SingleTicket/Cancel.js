import React from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const Cancel = () => {
  const { ticketId } = useParams();
  const history = useHistory();

  const ticket = useSelector((state) => state.tickets.user).find((tick) => tick._id === ticketId);
  const sportCenter = {};
  const event = useSelector((state) => state.events.all).find(
    (event) => event._id === ticket.eventId
  );

  return (
    <div>
      <Button variant="contained" color="default">
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
