import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { toggleActivated } from "../../../../../redux/actions/events";

const EventItem = ({ event, toggleActivated }) => {
  const { title, description, startTime, endTime, date, active } = event;
  const history = useHistory();

  return (
    <StyledEventItem onClick={() => { history.push(`/dashboard/events/${event._id}`) }}>
      <StyledHeader>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</span>{" "}
        <span>
          {format(new Date(date), "PPP")} {startTime} - {endTime}
        </span>
      </StyledHeader>
      <div>{description}</div>
      {active ? (
        <StyledButton
          onClick={() => toggleActivated(event._id, false)}
          variant="outlined"
          active={!active}
        >
          Deacivate
        </StyledButton>
      ) : (
        <StyledButton
          onClick={() => toggleActivated(event._id, true)}
          variant="contained"
          active={!active}
        >
          Activate
        </StyledButton>
      )}
    </StyledEventItem>
  );
};

export default connect(() => ({}), {
  toggleActivated,
})(EventItem);

const StyledEventItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
  width: 600px;
  margin-bottom: 10px;
  padding: 15px;
  position: relative;
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
