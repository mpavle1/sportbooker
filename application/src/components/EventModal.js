import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";

import { updateEvent } from "../redux/actions/events";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #777",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const EditModal = ({ event, onClose, onChange }) => {
  const dispatch = useDispatch();

  const sports = useSelector((state) => state.sports);
  const sportCenters = useSelector((state) => state.sportCenters);
  const sportCenter = sportCenters.find((sc) => sc._id === event.sportCenterId);

//   if (sports.length === 0 || sportCenters.length === 0) {
//     onClose();
//     reutrn;
//   }

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [sportId, setSportId] = useState(event.sportId);

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>Edit event</b>
        </Typography>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Start time"
            type="time"
            variant="outlined"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="End time"
            type="time"
            variant="outlined"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Date"
            type="date"
            variant="outlined"
            value={format(new Date(date), "yyyy-MM-dd")}
            onChange={(event) => setDate(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-label">Sport</InputLabel>
            <Select
              label="Sport"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sportId}
              onChange={(e) => setSportId(e.target.value)}
            >
              {sportCenter.sportIds.map((tempsportId) => {
                const sport = sports.find(
                  (singleSport) => singleSport._id === tempsportId
                );
                return (
                  <MenuItem value={sport._id} key={sport.name}>
                    {sport.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </StyledInfoFieldContainer>
        <StyledButtonContainer>
          <Button variant="contained" type="button" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => {
              dispatch(
                updateEvent({
                  ...event,
                  title,
                  description,
                  date,
                  startTime,
                  endTime,
                  sportId,
                })
              ).then(() => {
                onChange();
              });
            }}
          >
            Save Changes
          </Button>
        </StyledButtonContainer>
      </Box>
    </Modal>
  );
};

export default EditModal;

const StyledInfoFieldContainer = styled.div`
  margin: 10px 0;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
