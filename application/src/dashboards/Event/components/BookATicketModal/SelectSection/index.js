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
        return <North handleButtonClick={handleButtonClick} />;
      case "S":
        return <South handleButtonClick={handleButtonClick} />;
      case "E":
        return <East handleButtonClick={handleButtonClick} />;
      case "W":
        return <West handleButtonClick={handleButtonClick} />;
      default:
        break;
    }
  };

  const renderTitle = () => {
    switch (selectedStand) {
      case "N":
        return 'Please select a section in the North stand';
      case "S":
        return 'Please select a section in the South stand';
      case "E":
        return 'Please select a section in the East stand';
      case "W":
        return 'Please select a section in the West stand';
      default:
        break;
    }
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
