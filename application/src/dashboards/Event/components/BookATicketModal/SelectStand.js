import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import styled from "styled-components";

const SelectStand = ({
  handleStandSelect,
  setCurrentStep,
  currentStep,
  setIsModalVisible,
}) => {
  const handleButtonClick = (direction) => {
    handleStandSelect(direction);
    setCurrentStep(currentStep + 1);
  };

  const handleBackButtonClick = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <b>Please select a stand:</b>
      </Typography>

      <br />

      <StyledModalBody>
        <StyledNorthButton
          variant="outlined"
          onClick={() => handleButtonClick("N")}
        >
          North
        </StyledNorthButton>
        <StyledEastButton
          variant="outlined"
          onClick={() => handleButtonClick("E")}
        >
          East
        </StyledEastButton>
        <StyledWestButton
          variant="outlined"
          onClick={() => handleButtonClick("W")}
        >
          West
        </StyledWestButton>
        <StyledSouthButton
          variant="outlined"
          onClick={() => handleButtonClick("S")}
        >
          South
        </StyledSouthButton>
        <StyledImage src="/public/stadion.jpeg" />
      </StyledModalBody>

      <br />

      <Typography id="modal-modal-action" component="div">
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </Typography>
    </Fragment>
  );
};

export default SelectStand;

const StyledImage = styled.img`
  height: 178px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModalBody = styled.div`
  position: relative;
  height: 375px;
  width: 500px;
`;

const StyledNorthButton = styled(Button)`
  position: absolute !important;
  left: 50%;
  transform: translate(-50%, 95%);
  width: 123px;
  height: 50px;
`;

const StyledSouthButton = styled(Button)`
  position: absolute !important;
  left: 50%;
  transform: translate(-50%, 553%);
  width: 123px;
  height: 50px;
`;

const StyledEastButton = styled(Button)`
  height: 178px;
  position: absolute !important;
  transform: translate(446%, -50%);
  top: 50%;
`;

const StyledWestButton = styled(Button)`
  height: 178px;
  position: absolute !important;
  transform: translate(153%, -50%);
  top: 50%;
`;
