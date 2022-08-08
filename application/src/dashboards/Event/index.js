import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import BookATicketModal from "./components/BookATicketModal";

import { bookATicket } from '../../redux/actions/tickets';
import { getAllEventTickets } from '../../redux/actions/tickets';
import { getAllSports } from '../../redux/actions/sports';
import { getAllLocations } from '../../redux/actions/locations';

const Event = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const locations = useSelector((state) => state.locations);
  const sports = useSelector((state) => state.sports);

  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [sportCenter, setSportCenter] = useState(null);
  const [scUser, setscUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllEventTickets(eventId));
    dispatch(getAllSports());
    dispatch(getAllLocations());
  }, []);

  useEffect(() => {
    axios.get(`api/events/${eventId}`).then((response) => {
      setEvent(response.data);
    });
  }, []);

  useEffect(() => {
    if (event === null) {
      return;
    }
    axios.get(`api/sportCenters/${event.sportCenterId}`).then((response) => {
      setSportCenter(response.data);
    });
  }, [event]);

  useEffect(() => {
    if (sportCenter === null) {
      return;
    }
    axios.get(`api/users/${sportCenter.userId}`).then((response) => {
      setscUser(response.data);
    });
  }, [sportCenter]);

  if (event === null || sportCenter === null || scUser === null) {
    return <div>Loading...</div>;
  }

  const onBookATicketClick = (stand, section, seats) => {
    dispatch(bookATicket({
      userId: user._id,
      sportCenterId: sportCenter._id,
      eventId: eventId,
      stand,
      section,
      seats
    }));
    dispatch(getAllEventTickets(eventId));
  }

  let canBookATicket = user.type !== undefined && user.type === "user"

  const {
    active,
    date,
    description,
    endTime,
    locationId,
    sportId,
    startTime,
    title,
  } = event;

  const location = locations.find((singleLocation) => singleLocation._id === locationId)?.name;
  const sport = sports.find((singleLocation) => singleLocation._id === sportId)?.name;

  const { user: { name: scName } } = scUser;
  const { capacity } = sportCenter;
  return (
    <Fragment>
      <h1>{title}</h1>
      <div>
        {scName} / {location} ({capacity})
      </div>
      <div>{format(new Date(date), "PPP")}</div>
      <div>
        {startTime}-{endTime}
      </div>
      <div>{sport}</div>
      <div>{description}</div>
      {canBookATicket && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => setIsModalVisible(true)}
        >
          Book a ticket
        </Button>
      )}
      <BookATicketModal
        isVisible={isModalVisible}
        handleCloseModal={setIsModalVisible}
        stadium={sportCenter.stadium}
        onBookATicketClick={onBookATicketClick}
      />
    </Fragment>
  );
};

export default Event;
