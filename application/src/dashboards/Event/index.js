import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import BookATicketModal from "./components/BookATicketModal";

const Event = ({ user }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [sportCenter, setSportCenter] = useState(null);
  const [scUser, setscUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`api/events/${eventId}`).then((response) => {
      setEvent(response.data);
    });
  }, []);

  useEffect(() => {
    if (event === null) {
      return;
    }
    axios.get(`api/sportCenters/${event.sportCenter_id}`).then((response) => {
      setSportCenter(response.data);
    });
  }, [event]);

  useEffect(() => {
    if (sportCenter === null) {
      return;
    }
    axios.get(`api/users/${sportCenter.user_id}`).then((response) => {
      setscUser(response.data);
    });
  }, [sportCenter]);

  if (event === null || sportCenter === null || scUser === null) {
    return <div>Loading...</div>;
  }

  const canBookATicket = user.type === "user" && event.active;

  const {
    active,
    date,
    description,
    endTime,
    location,
    setByAdmin,
    sport,
    startTime,
    title,
  } = event;
  const { name: scName } = scUser;
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
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Event);
