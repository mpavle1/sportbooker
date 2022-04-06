import React, { Fragment, memo } from "react";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';

const SelectSeat = ({
  currentStep,
  setCurrentStep,
  selectedStand,
  selectedSection,
  stadium,
  selectedSeats,
  setSelectedSeats
}) => {
  const handleBackButtonClick = () => {
    setSelectedSeats([]);
    setCurrentStep(currentStep - 1);
  };

  const renderSeats = () => {
    const returnValue = [];
    const section = stadium[selectedStand].sections[selectedSection];

    for(let i = 0; i < section.row; i++) {
      for(let j = 0; j < section.column; j++) {
        returnValue.push(
        <StyledButton onClick={() => {
            if (selectedSeats.some((seat) => seat.row === i + 1 && seat.column === j + 1)) {
              const filteredSeats = selectedSeats.filter((seat) => seat.row !== i + 1 || seat.column !== j + 1);
              setSelectedSeats([...filteredSeats]);
            } else {
              setSelectedSeats([...selectedSeats, {row: i+1, column: j+1}]);
            }
          }}
          isseatselected={selectedSeats.find((seat) => seat.row === i + 1 && seat.column === j + 1) !== undefined}
          key={uuidv4()}
        >
          r:{i+1}/c:{j+1}
        </StyledButton>
        );
      }
    }

    return <StyledRowContainer rowCount={section.row} columnCount={section.column}>{returnValue}</StyledRowContainer>;
  }

  return (
    <Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <b>Please select a seat:</b>
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
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => console.log("clicked")}
        >
          Book now!
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
  grid-template-columns: repeat(${({ columnCount }) => (columnCount)}, 1fr);
  grid-template-rows: repeat(${({ rowCount }) => (rowCount)}, 1fr);
  gap: 5px;
`;

const StyledButton = styled(Button)`
  border: 1px solid #777 !important;
  background-color: ${({ isseatselected }) => isseatselected ? '#68a66e' : 'transparent' } !important;
`;
