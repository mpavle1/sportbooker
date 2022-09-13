import React, { Fragment, memo } from "react";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SelectSeat = ({
  currentStep,
  setCurrentStep,
  selectedStand,
  selectedSection,
  stadium,
}) => {
  const tickets = useSelector((state) => state?.tickets?.event);
  const { eventId } = useParams();

  const handleBackButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };

  const isSpaceBooked = (row, column) => {
    return !!tickets.find(
      (ticket) =>
        ticket.seat.row === row &&
        ticket.seat.column === column &&
        ticket.section === selectedSection &&
        ticket.stand === selectedStand &&
        ticket.eventId === eventId
    );
  };

  const getSeatButton = (i, j) => (
    <StyledButton
      key={uuidv4()}
      $bookedSeat={isSpaceBooked(i, j+1)}
    ></StyledButton>
  );

  const renderSeats = () => {
    const returnValue = [];
    const section = stadium[selectedStand].sections[selectedSection];

    var rowCount = null;
    var colCount = null;

    switch (selectedStand) {
      case "N":
        var rowCount = section.row;
        var colCount = section.column;

        returnValue.push(
          <StyledInfoButton key={uuidv4()}>row\col</StyledInfoButton>
        );
        for (let j = 0; j < section.column; j++) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{j + 1}</StyledInfoButton>
          );
        }

        for (let i = section.row; i > 0; i--) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{i}</StyledInfoButton>
          );
          for (let j = 0; j < section.column; j++) {
            returnValue.push(getSeatButton(i, j, false));
          }
        }
        break;
      case "S":
        var rowCount = section.row;
        var colCount = section.column;

        returnValue.push(
          <StyledInfoButton key={uuidv4()}>row\col</StyledInfoButton>
        );
        for (let j = 0; j < section.column; j++) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{j + 1}</StyledInfoButton>
          );
        }

        for (let i = 0; i < section.row; i++) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{i + 1}</StyledInfoButton>
          );
          for (let j = 0; j < section.column; j++) {
            returnValue.push(getSeatButton(i + 1, j, false));
          }
        }
        break;
      case "E":
        var rowCount = section.column;
        var colCount = section.row;

        returnValue.push(
          <StyledInfoButton key={uuidv4()}>col\row</StyledInfoButton>
        );
        for (let j = 0; j < section.row; j++) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{j + 1}</StyledInfoButton>
          );
        }

        for (let i = 0; i < section.column; i++) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{i + 1}</StyledInfoButton>
          );
          for (let j = 0; j < section.row; j++) {
            returnValue.push(getSeatButton(j + 1, i, true));
          }
        }
        break;
      case "W":
        var rowCount = section.column;
        var colCount = section.row;

        returnValue.push(
          <StyledInfoButton key={uuidv4()}>col\row</StyledInfoButton>
        );
        for (let j = section.row; j > 0; j--) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{j}</StyledInfoButton>
          );
        }

        for (let i = 0; i < section.column; i++) {
          returnValue.push(
            <StyledInfoButton key={uuidv4()}>{i + 1}</StyledInfoButton>
          );
          for (let j = section.row; j > 0; j--) {
            returnValue.push(getSeatButton(j, i, true));
          }
        }
        break;
      default:
        legend = "";
        break;
    }

    return (
      <StyledRowContainer rowCount={rowCount} columnCount={colCount}>
        {returnValue}
      </StyledRowContainer>
    );
  };

  return (
    <Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <b>Booked seats are highlighted</b>
        <StyledInformation>
          Stand: {selectedStand} / Section: {selectedSection}
        </StyledInformation>
      </Typography>
      {renderSeats()}
      <StyledButtons>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </StyledButtons>
    </Fragment>
  );
};

export default memo(SelectSeat);

const StyledInformation = styled.div`
  font-size: 16px;
  color: #777;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledRowContainer = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => columnCount + 1}, 1fr);
  grid-template-rows: repeat(${({ rowCount }) => rowCount}, 1fr);
  gap: 5px;
`;

const StyledButton = styled(Button)`
  border: 1px solid #777 !important;
  background-color: ${({ $bookedSeat }) =>
    $bookedSeat ? "#B01414" : "transparent"} !important;
`;

const StyledInfoButton = styled(Button)``;
