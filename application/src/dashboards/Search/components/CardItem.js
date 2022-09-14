import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";

const CardItem = ({ event }) => {
  const {
    title,
    description,
    startTime,
    endTime,
    date,
    active,
    sportId,
    locationId,
  } = event;

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
        <span>
          {format(new Date(date), "PPP")} {startTime} - {endTime}
        </span>
      </StyledHeader>
      <SpacingBottom>{location}</SpacingBottom>
      <SpacingBottom>{sport}</SpacingBottom>
      <StyledDescription>{description}</StyledDescription>
      <br />
      {isEventOngoing && (
        <StyledEventInProgress>Event is in progress!</StyledEventInProgress>
      )}
    </StyledEventItem>
  );
};

export default CardItem;

const StyledEventItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
  width: 600px;
  margin-bottom: 10px;
  padding: 15px;
  position: relative;
  display: inline-block;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: ${({ active }) => (active ? "#1B8E2B" : "#B01414")};
  border-color: ${({ active }) => (active ? "#1B8E2B" : "#B01414")};
  border-radius: 5px;
  background: transparent;
  outline: none;
  box-shadow: none;
  cursor: pointer;
`;

const StyledEventInProgress = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: green;
`;

const StyledDescription = styled.div`
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SpacingBottom = styled.div`
  margin-bottom: 10px;
`;
