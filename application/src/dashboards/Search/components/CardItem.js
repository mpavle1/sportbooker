import React from "react";
import { format } from "date-fns";
import styled from "styled-components";

const CardItem = ({ event }) => {
  const { title, description, startTime, endTime, date, active, sport } = event;
  return (
    <StyledEventItem>
      <StyledHeader>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</span>{" "}
        <span>
          {format(new Date(date), "PPP")} {startTime} - {endTime}
        </span>
      </StyledHeader>
      <div>{sport}</div>
      <div>{description}</div>
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
