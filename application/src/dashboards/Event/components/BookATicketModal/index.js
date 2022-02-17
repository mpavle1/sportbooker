import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";

import SelectStand from "./SelectStand";
import SelectSection from "./SelectSection";
import SelectSeat from "./SelectSeat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #777",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
};

const BookATicketModal = ({ isVisible, handleCloseModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStand, setSelectedStand] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState({ row: null, column: null });

  const onModalClose = () => {
    setCurrentStep(1);
    setSelectedStand(null);
    setSelectedSection(null);
    setSelectedSeat({ row: null, column: null });
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
          />
        );
      case 2:
        return (
          <SelectSection
            handleSectionSelect={setSelectedSection}
            setCurrentStep={setCurrentStep}
            selectedStand={selectedStand}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <SelectSeat
            handleSectionSeat={setSelectedSeat}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            selectedStand={selectedStand}
            selectedSection={selectedSection}
            selectedSeat={selectedSeat}
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
      <Box sx={style}>{renderCurrentStep()}</Box>
    </Modal>
  );
};

export default BookATicketModal;
