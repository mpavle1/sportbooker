import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import { getSportCenter } from "../../../../../../redux/actions/auth";

const Change = () => {
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
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const { title, description, startTime, endTime, date, sportCenterId } = event;

  useEffect(() => {
    getSportCenter(sportCenterId).then((response) =>
      setSportCenter(response.data)
    );
  }, []);

  console.log(sportCenter);

  if (sportCenter === null) {
    return null;
  }

  return (
    <div>
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
        <div style={{ margin: "10px 0" }}>{description}</div>
        <br />
        <div>Current Ticket:</div>
        <div>
          stand: {ticket.stand} section: {ticket.section}
        </div>
        <div>
          row: {ticket.seat.row} column: {ticket.seat.column}
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={() => setIsModalVisible(true)}
        >
          Change Ticket Seat
        </Button>
      </div>
      {/* <BookATicketModal
        isVisible={isModalVisible}
        handleCloseModal={() => setIsModalVisible(false)}
        stadium={sportCenter.sportCenter.stadium}
        onBookATicketClick={(ticket) => console.log(ticket)}
      /> */}
      <br />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(123)}
        >
          Change
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => history.push(`/dashboard/tickets/`)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default Change;
