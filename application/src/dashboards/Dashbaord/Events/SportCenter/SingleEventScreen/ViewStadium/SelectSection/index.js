import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";

import North from "./North";
import South from "./South";
import East from "./East";
import West from "./West";

const SelectSection = ({
  handleSectionSelect,
  currentStep,
  setCurrentStep,
  selectedStand,
  stadium,
}) => {
  const handleButtonClick = (direction) => {
    handleSectionSelect(direction);
    setCurrentStep(currentStep + 1);
  };

  const handleBackButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderSelectedStand = () => {
    switch (selectedStand) {
      case "N":
        return (
          <North handleButtonClick={handleButtonClick} stadium={stadium} />
        );
      case "S":
        return (
          <South handleButtonClick={handleButtonClick} stadium={stadium} />
        );
      case "E":
        return <East handleButtonClick={handleButtonClick} stadium={stadium} />;
      case "W":
        return <West handleButtonClick={handleButtonClick} stadium={stadium} />;
      default:
        break;
    }
  };

  const renderTitle = () => {
    let direction = "";
    switch (selectedStand) {
      case "N":
        direction = "North";
      case "S":
        direction = "South";
      case "E":
        direction = "East";
      case "W":
        direction = "West";
      default:
        break;
    }

    return `Select a section in the ${direction} stand`;
  };

  return (
    <Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <b>{renderTitle()}</b>
      </Typography>
      <br />
      {renderSelectedStand()}
      <br />
      <Button
        variant="outlined"
        color="primary"
        type="button"
        onClick={handleBackButtonClick}
      >
        Back
      </Button>
    </Fragment>
  );
};

export default SelectSection;
