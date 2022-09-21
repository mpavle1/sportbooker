import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import PlaceIcon from "@mui/icons-material/Place";
import StadiumIcon from "@mui/icons-material/Stadium";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

const EventCard = ({ event }) => {
  const locations = useSelector((state) => state.locations);
  const sports = useSelector((state) => state.sports);
  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);

  if (!sportCenters || !users) {
    return null;
  }

  const sportCenter = sportCenters.find((sc) => sc._id === event.sportCenterId);
  const user = users.find((u) => u._id === sportCenter.userId);

  return (
    <StyledEventCard
      onClick={() => window.location.replace(`/event/${event._id}`)}
    >
      <div>{event.title}</div>
      <StyledEventFiled>
        <EventIcon />
        {format(new Date(event.date), "PPP")}
      </StyledEventFiled>
      <StyledEventFiled>
        <AccessTimeIcon />
        {event.startTime}-{event.endTime}
      </StyledEventFiled>
      <StyledEventFiled>
        <StadiumIcon />
        {user.name}
      </StyledEventFiled>
      <StyledEventFiled>
        <PlaceIcon />{" "}
        {locations.find((location) => location._id === event.locationId)?.name}
      </StyledEventFiled>
      <StyledEventFiled>
        <SportsHandballIcon />
        {sports.find((sport) => sport._id === event.sportId)?.name}
      </StyledEventFiled>
    </StyledEventCard>
  );
};

export default EventCard;

const StyledEventCard = styled.div`
  cursor: pointer;
  border: 1px solid #777;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  padding: 10px;
`;

const StyledEventFiled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
