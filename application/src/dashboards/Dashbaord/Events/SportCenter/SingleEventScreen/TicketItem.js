import React from "react";
import styled from "styled-components";

const TicketItem = ({ ticket, user }) => {
  return (
    <StyledEventItem>
      <StyledTicket>
        <div>
          {user.name} {user.lastName}
        </div>
        <div>
          <b>Ticket Id:</b> {ticket._id}
        </div>
        <div>
          <b>stand:</b> {ticket.stand} <b>section:</b> {ticket.section}
        </div>
        <div>
          <b>row:</b> {ticket.seat.row} <b>column:</b> {ticket.seat.column}
        </div>
      </StyledTicket>
    </StyledEventItem>
  );
};

export default TicketItem;

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

const StyledTicket = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
