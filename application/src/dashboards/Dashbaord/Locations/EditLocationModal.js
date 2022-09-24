import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Box, Typography, Modal, TextField, Button } from "@material-ui/core";

import { updateLocation } from "../../../redux/actions/locations";

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

const EditLocationModal = ({ onClose, location }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(location.name);
  const [lat, setLat] = useState(location?.coordinates?.lng);
  const [lng, setLng] = useState(location?.coordinates?.lng);

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <StyledModalTitle id="modal-modal-title" variant="h6" component="h2">
          Update Location
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
              updateLocation({
                ...location,
                name,
                coordinates: {
                  lat,
                  lng,
                },
              })
            );
            alert("Location has been updated");
          }}
        >
          Update Location
        </Button>
      </Box>
    </Modal>
  );
};

export default EditLocationModal;

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
