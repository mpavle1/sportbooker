import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import PlaceIcon from "@mui/icons-material/Place";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Alert from "@mui/material/Alert";

const CardItem = ({ event }) => {
  const { title, description, startTime, endTime, date, sportId, locationId } =
    event;

  const history = useHistory();

  const locations = useSelector((state) => state.locations);
  const sports = useSelector((state) => state.sports);

  const today = moment().format(`YYYY-MM-DD HH:mm`);
  const eventDate = moment(new Date(date).toString()).format("YYYY-MM-DD");
  const endDateTime = moment(`${eventDate} ${endTime}`);
  const startDateTime = moment(`${eventDate} ${startTime}`);

  const isEventOngoing = moment(today).isBetween(startDateTime, endDateTime);

  const location = locations.find(
    (singleLocation) => singleLocation._id === locationId
  )?.name;
  const sport = sports.find(
    (singleLocation) => singleLocation._id === sportId
  )?.name;

  return (
    <StyledEventItem>
      <StyledHeader>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</span>{" "}
        <span style={{ textAlign: "right" }}>
          {format(new Date(date), "PPP")}{" "}
          <span style={{ display: "block" }}>
            {startTime} - {endTime}
          </span>
        </span>
      </StyledHeader>
      <SpacingBottom>
        <PlaceIcon color="error" />
        {location}
      </SpacingBottom>
      <SpacingBottom>
        <SportsHandballIcon color="success" />
        {sport}
      </SpacingBottom>
      <br />
      <StyledDescription>{description}</StyledDescription>
      <StyledEventInProgress>
        {isEventOngoing ? (
          <Alert severity="success" icon={false} variant="outlined">
            Event is in progress!
          </Alert>
        ) : (
          <Button
            type="button"
            onClick={() => {
              history.push(`/event/${event._id}`);
            }}
            variant="contained"
            color="primary"
          >
            View Event
          </Button>
        )}
      </StyledEventInProgress>
    </StyledEventItem>
  );
};

export default CardItem;

const StyledEventItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 600px;
  margin-bottom: 10px;
  padding: 15px;
  position: relative;
  display: inline-block;
  color: #333 !important;
  &:hover {
    color: #333 !important;
  }
  height: fit-content;
  /* cursor: pointer; */
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  gap: 5px;
`;

const StyledEventInProgress = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const StyledDescription = styled.div`
  width: 400px;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SpacingBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 7px;
`;
