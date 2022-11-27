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
import StarIcon from "@mui/icons-material/Star";
import Alert from "@mui/material/Alert";

import SportCenterMap from "./components/SportCenterMap";
import Reviews from "./components/ReviewSection";
import EventsFromSc from "./components/EventsFromSc";
import OtherEventsFromLocation from "./components/OtherEventsFromLocation";
import BookATicketModal from "./components/BookATicketModal";
import SearchBox from "../../components/SearchBox";

import { bookATicket } from "../../redux/actions/tickets";
import { getAllEventTickets } from "../../redux/actions/tickets";
import { getAllLocations } from "../../redux/actions/locations";
import { getAllSportCenters } from "../../redux/actions/sportCenters";
import { getAllUsers } from "../../redux/actions/users";
import { getAllSportCenterReviews } from "../../redux/actions/reviews";
import { fetchSports } from "../../redux/features/sports";

const Event = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const locations = useSelector((state) => state.locations);
  const sports = useSelector((state) => state.sports);
  const tickets = useSelector((state) => state.tickets.event);
  const reviews = useSelector((state) => state.reviews.sportCenter);

  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [sportCenter, setSportCenter] = useState(null);
  const [scUser, setscUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllEventTickets(eventId));
    dispatch(fetchSports());
    dispatch(getAllLocations());
    dispatch(getAllSportCenters());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (sportCenter) {
      dispatch(getAllSportCenterReviews(sportCenter._id));
    }
  }, [sportCenter]);

  const calculateCapacity = () => {
    let sum = 0;
    Object.values(sportCenter.stadium).forEach((stand) => {
      let tempSum = 0;

      Object.values(stand.sections).forEach((section) => {
        tempSum += +section.active ? section.row * section.column : 0;
      });

      sum += tempSum;
    });

    return sum;
  };

  const calculateRating = () => {
    if (reviews.length === 0) {
      return null;
    }

    const sumScore = reviews.reduce(function (acc, obj) {
      return acc + obj.score;
    }, 0);

    return (
      <StyledIconContainer>
        <StarIcon color="warning" fontSize="large" />{" "}
        {sumScore / reviews.length} / 5
      </StyledIconContainer>
    );
  };

  const calculateRemainingSeats = () => {
    return calculateCapacity() - tickets.length;
  };

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
        return (
          <Alert icon={false} severity="success">
            Event is in progress!
          </Alert>
        );
      }

      if (moment(today).isAfter(endDateTime)) {
        return <Alert severity="error">This Event has ended</Alert>;
      }
    }

    if (!canBookATicket) {
      return (
        <Alert severity="warning" sx={{ textAlign: "center", width: "300px" }}>
          An active account is required to book a ticket. Login or register to
          proceed.
        </Alert>
      );
    }

    if (moment(today).isBetween(startDateTime, endDateTime)) {
      return (
        <Alert icon={false} severity="success">
          Event is in progress!
        </Alert>
      );
    }

    if (moment(today).isAfter(endDateTime)) {
      return <Alert severity="error">This Event has ended</Alert>;
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

  const renderMap = () => {
    if (!sportCenter) {
      return null;
    }
    return <SportCenterMap scCoordinates={sportCenter.coordinates} />;
  };

  return (
    <div>
      <StyledEventPage>
        <div>
          {renderMap()}
          <SearchBox />
        </div>
        <div style={{ width: "100%" }}>
          <StyledTitleContainer>
            {title} {renderBookATicket()}
          </StyledTitleContainer>
          <hr />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {calculateRating()}
              <StyledIconContainer>
                <PlaceIcon color="error" fontSize="large" /> {location}
              </StyledIconContainer>
              <StyledIconContainer>
                <StadiumIcon fontSize="large" /> {scName}
              </StyledIconContainer>
              <StyledIconContainer>
                <EventSeatRoundedIcon fontSize="large" />{" "}
                {calculateRemainingSeats()} / {capacity} seats remaining
              </StyledIconContainer>
              <StyledIconContainer>
                <EventIcon color="primary" fontSize="large" />{" "}
                {format(new Date(date), "PPP")}
              </StyledIconContainer>
              <StyledIconContainer>
                <AccessTimeIcon fontSize="large" /> {startTime} - {endTime}
              </StyledIconContainer>
              <StyledIconContainer>
                <SportsHandballIcon fontSize="large" color="success" /> {sport}
              </StyledIconContainer>
            </div>
            <div>
              <StyledImg src={sportCenter.profilePhoto} />
            </div>
          </div>
          <br />
          <StyledDescription>{description}</StyledDescription>
          <br />
          <Reviews sportCenterId={sportCenter._id} />
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
      </StyledEventPage>
    </div>
  );
};

export default Event;

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
  margin-top: 0;
`;

const StyledDescription = styled.div`
  width: 650px;
  line-height: 1.4;
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
