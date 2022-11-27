import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Box, Typography, Modal, TextField, Button } from "@material-ui/core";

import { addLocation } from "../../../redux/features/locations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #777",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const AddNewLocationModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <StyledModalTitle id="modal-modal-title" variant="h6" component="h2">
          Add a new Location
        </StyledModalTitle>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Latitude"
            variant="outlined"
            type="text"
            value={lat}
            onChange={(event) => setLat(event.target.value)}
            multiline
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Longitude"
            variant="outlined"
            type="text"
            value={lng}
            onChange={(event) => setLng(event.target.value)}
            multiline
          />
        </StyledInfoFieldContainer>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={!(name && lat && lng)}
          onClick={() => {
            onClose();
            dispatch(
              addLocation({
                name,
                coordinates: {
                  lat,
                  lng,
                },
              })
            );
          }}
        >
          Add Location
        </Button>
      </Box>
    </Modal>
  );
};

export default AddNewLocationModal;

const StyledInfoFieldContainer = styled.div`
  margin: 10px 0;
`;

const StyledModalTitle = styled(Typography)`
  margin: -16px -16px 0;
  padding: 16px;
  /* border-bottom: 1px solid #777; */
  background-color: #3f50b5;
  color: white;
  border-radius: 4px 4px 0 0;
`;
