import React, { Fragment } from "react";
import styled from "styled-components";
import { Typography, TextField, Button } from "@material-ui/core";

const SelectSeat = ({
  handleSectionSeat,
  currentStep,
  setCurrentStep,
  selectedStand,
  selectedSection,
  selectedSeat,
}) => {
  const handleBackButtonClick = () => {
    handleSectionSeat({ row: null, column: null });
    setCurrentStep(currentStep - 1);
  };

  return (
    <Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <b>Please select a seat:</b>
        <StyledInformation>
          Stand: {selectedStand} / Section: {selectedSection}
        </StyledInformation>
      </Typography>
      <StyledInfoFieldContainer>
        <TextField
          fullWidth
          label="Row"
          type="number"
          variant="outlined"
          value={null}
          onChange={(event) =>
            handleSectionSeat({ ...selectedSeat, row: event.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </StyledInfoFieldContainer>
      <StyledInfoFieldContainer>
        <TextField
          fullWidth
          label="Column"
          type="number"
          variant="outlined"
          value={null}
          onChange={(event) =>
            handleSectionSeat({ ...selectedSeat, column: event.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </StyledInfoFieldContainer>
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
      <div>Dodati prikaz kao malog segmenta da korisnik zna u kom pravcu su redovi i kolone</div>
    </Fragment>
  );
};

export default SelectSeat;

const StyledInfoFieldContainer = styled.div`
  margin: 10px 0;
`;

const StyledInformation = styled.div`
  font-size: 16px;
  color: #777;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
