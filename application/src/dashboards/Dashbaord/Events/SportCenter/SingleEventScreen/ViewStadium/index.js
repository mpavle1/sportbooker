import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";

import SelectStand from "./SelectStand";
import SelectSection from "./SelectSection";
import SelectSeat from "./SelectSeat";

function getStyle(step) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #777",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
  };

  if (step !== 3) {
    style.width = 500;
  }

  return style;
}

const ViewStadium = ({ isVisible, handleCloseModal, stadium }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStand, setSelectedStand] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const onModalClose = () => {
    setCurrentStep(1);
    setSelectedStand(null);
    setSelectedSection(null);
    setSelectedSeats([]);
    handleCloseModal(false);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectStand
            handleStandSelect={setSelectedStand}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            setIsModalVisible={handleCloseModal}
            stadium={stadium}
          />
        );
      case 2:
        return (
          <SelectSection
            handleSectionSelect={setSelectedSection}
            setCurrentStep={setCurrentStep}
            selectedStand={selectedStand}
            currentStep={currentStep}
            stadium={stadium}
          />
        );
      case 3:
        return (
          <SelectSeat
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            selectedStand={selectedStand}
            selectedSection={selectedSection}
            stadium={stadium}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        );
      default:
        break;
    }
  };

  return (
    <Modal
      open={isVisible}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={getStyle(currentStep)}>{renderCurrentStep()}</Box>
    </Modal>
  );
};

export default ViewStadium;
