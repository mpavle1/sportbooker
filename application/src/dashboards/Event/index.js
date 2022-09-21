import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import PlaceIcon from "@mui/icons-material/Place";
import StadiumIcon from "@mui/icons-material/Stadium";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";

import EventsFromSc from "./components/EventsFromSc";
import OtherEventsFromLocation from "./components/OtherEventsFromLocation";
import BookATicketModal from "./components/BookATicketModal";
import SearchBox from "../../components/SearchBox";

import { bookATicket } from "../../redux/actions/tickets";
import { getAllEventTickets } from "../../redux/actions/tickets";
import { getAllSports } from "../../redux/actions/sports";
import { getAllLocations } from "../../redux/actions/locations";
import { getAllSportCenters } from "../../redux/actions/sportCenters";
import { getAllUsers } from "../../redux/actions/users";

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
    dispatch(getAllSportCenters());
    dispatch(getAllUsers());
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
    dispatch(
      bookATicket({
        userId: user._id,
        sportCenterId: sportCenter._id,
        eventId: eventId,
        stand,
        section,
        seats,
      })
    ).then(() => {
      alert("You have successfully booked a ticket for this event");
    });
    dispatch(getAllEventTickets(eventId));
  };

  let canBookATicket = user.type !== undefined && user.type === "user";

  const { date, description, endTime, locationId, sportId, startTime, title } =
    event;

  const location = locations.find(
    (singleLocation) => singleLocation._id === locationId
  )?.name;
  const sport = sports.find(
    (singleLocation) => singleLocation._id === sportId
  )?.name;

  const {
    user: { name: scName },
  } = scUser;
  const { capacity } = sportCenter;

  const today = moment().format(`YYYY-MM-DD HH:mm`);
  const eventDate = moment(new Date(date).toString()).format("YYYY-MM-DD");
  const endDateTime = moment(`${eventDate} ${endTime}`);
  const startDateTime = moment(`${eventDate} ${startTime}`);

  const renderBookATicket = () => {
    if (["admin", "sportCenter"].includes(user.type)) {
      if (moment(today).isBetween(startDateTime, endDateTime)) {
        return <div style={{ color: "green" }}> Event is in progress!</div>;
      }

      if (moment(today).isAfter(endDateTime)) {
        return <div style={{ color: "darkred" }}>This event has ended</div>;
      }
    }

    if (!canBookATicket) {
      return (
        <StyledLoginRequired>
          An active account is required to book a ticket. Login or register to
          preceed.
        </StyledLoginRequired>
      );
    }

    if (moment(today).isBetween(startDateTime, endDateTime)) {
      return <div style={{ color: "green" }}> Event is in progress!</div>;
    }

    if (moment(today).isAfter(endDateTime)) {
      return <div style={{ color: "darkred" }}>This event has ended</div>;
    }

    return (
      <Fragment>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => setIsModalVisible(true)}
        >
          Book a ticket
        </Button>
        <BookATicketModal
          isVisible={isModalVisible}
          handleCloseModal={setIsModalVisible}
          stadium={sportCenter.stadium}
          onBookATicketClick={onBookATicketClick}
        />
      </Fragment>
    );
  };

  return (
    <div>
      <StyledEventPage>
        <SearchBox />
        <div style={{ width: "100%" }}>
          <StyledTitleContainer>
            {title} {renderBookATicket()}
          </StyledTitleContainer>
          <hr />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <StyledIconContainer>
                <StyledLocationIcon fontSize="large" /> {location}
              </StyledIconContainer>
              <StyledIconContainer>
                <StadiumIcon fontSize="large" /> {scName}
              </StyledIconContainer>
              <StyledIconContainer>
                <EventSeatRoundedIcon fontSize="large" /> {capacity}
              </StyledIconContainer>
              <StyledIconContainer>
                <EventIcon fontSize="large" /> {format(new Date(date), "PPP")}
              </StyledIconContainer>
              <StyledIconContainer>
                <AccessTimeIcon fontSize="large" /> {startTime} - {endTime}
              </StyledIconContainer>
              <StyledIconContainer>
                <SportsHandballIcon fontSize="large" /> {sport}
              </StyledIconContainer>
            </div>
            <div>
              <StyledImg src={sportCenter.profilePhoto} />
            </div>
          </div>
          <br />
          <StyledDescription>{description}</StyledDescription>
        </div>
      </StyledEventPage>
      <div>
        {sportCenter && (
          <EventsFromSc sportCenterId={sportCenter._id} eventId={eventId} />
        )}
        {sportCenter && (
          <OtherEventsFromLocation
            sportCenterId={sportCenter._id}
            locationId={event.locationId}
            location={location}
          />
        )}
      </div>
    </div>
  );
};

export default Event;

const StyledLocationIcon = styled(PlaceIcon)`
  color: #3f51b5;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
  font-size: 20px;
`;

const StyledEventContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 20px;
`;

const StyledTitleContainer = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDescription = styled.div`
  width: 650px;
  line-height: 1.4;
`;

const StyledLoginRequired = styled.div`
  font-size: 15px;
  width: 200px;
  color: #777;
  text-align: center;
`;

const StyledEventPage = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 50px;
`;

const StyledImg = styled.img`
  height: 300px;
  width: 553px;
`;
