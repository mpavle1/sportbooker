import React, { useState } from "react";
import styled from "styled-components";
import { Typography, TextField, Button, Modal, Box } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

const SetRowColumnModal = ({
  isModalVisible,
  setIsModalVisible,
  stadium,
  updateStadium,
  standAndSection,
}) => {
  const [numberOrRows, setNumberOfRows] = useState(
    stadium[standAndSection.stand].sections[standAndSection.section].row
  );
  const [numberOfColumns, setNumberOfColumns] = useState(
    stadium[standAndSection.stand].sections[standAndSection.section].column
  );

  return (
    <Modal
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>Set the number of row:</b>
          <StyledInformation>
            Stand: {standAndSection.stand} / Section: {standAndSection.section}
          </StyledInformation>
        </Typography>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Row"
            type="number"
            variant="outlined"
            value={numberOrRows}
            onChange={(event) => setNumberOfRows(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 10 } }}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Column"
            type="number"
            variant="outlined"
            value={numberOfColumns}
            onChange={(event) => setNumberOfColumns(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 10 } }}
          />
        </StyledInfoFieldContainer>
        <StyledButtons>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => setIsModalVisible(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() =>
              updateStadium(
                standAndSection.stand,
                standAndSection.section,
                numberOrRows,
                numberOfColumns
              )
            }
          >
            Update
          </Button>
        </StyledButtons>
      </Box>
    </Modal>
  );
};

export default SetRowColumnModal;

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
