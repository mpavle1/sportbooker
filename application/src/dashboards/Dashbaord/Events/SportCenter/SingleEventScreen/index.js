import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import ViewStadium from "./ViewStadium";

import { getAllEventTickets } from "../../../../../redux/actions/tickets";

const SingleEventScreen = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) =>
    state?.events?.user?.find((singleEvent) => singleEvent._id === eventId)
  );
  const sportCenter = useSelector((state) => state?.auth?.sportCenter);
  const tickets = useSelector((state) => state.tickets.event);
  const sports = useSelector((state) => state?.sports);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllEventTickets(eventId))
  }, []);

  if (!event && sports.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Information for event:</h1>
      <div>{event.title}</div>
      <div>{event.description}</div>
      <div>{event.date}</div>
      <div>{event.startTime}</div>
      <div>{event.endTime}</div>
      <div>Booked tickets: {tickets.length} / {sportCenter.capacity}</div>
      <div>{(sports.find((sport) => sport._id === event.sportId))?.name}</div>
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
    </div>
  );
};

export default SingleEventScreen;
