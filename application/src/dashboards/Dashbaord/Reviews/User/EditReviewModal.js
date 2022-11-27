import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Box, Typography, Modal, TextField, Button } from "@material-ui/core";
import { Rating } from "@mui/material";

import { locationsSelectors } from "../../../../redux/features/locations";
import { updateReview } from "../../../../redux/actions/reviews";

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

const EditReviewModal = ({ onClose, event, review }) => {
  const dispatch = useDispatch();

  const sportCenter = useSelector((state) => state.sportCenters)?.find(
    (sc) => sc._id === event.sportCenterId
  );
  const scUser = useSelector((state) => state.users.users)?.find(
    (usr) => usr._id === sportCenter.userId
  );
  const location = useSelector((state) => state.locations)?.find(
    (loc) => loc._id === sportCenter.locationId
  );

  const [title, setTitle] = useState(review.title);
  const [comment, setComment] = useState(review.comment);
  const [score, setScore] = useState(review.score);

  const renderSportCenter = () => {
    return (
      <StyledSC>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {scUser.name} - {location.name} - Capacity: {sportCenter.capacity}{" "}
          seats
        </div>
        <StyledSCphoto src={sportCenter.profilePhoto} />
      </StyledSC>
    );
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <StyledModalTitle id="modal-modal-title" variant="h6" component="h2">
          Make changes to your review
        </StyledModalTitle>
        {renderSportCenter()}
        <hr />
        <StyledInfoFieldContainer>
          <Typography component="legend">Your selected rating</Typography>
          <Rating
            name="simple-controlled"
            value={score}
            onChange={(event, newValue) => {
              setScore(newValue);
            }}
            max={5}
            precision={0.5}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Title of your review"
            variant="outlined"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            fullWidth
            label="Description of your experience"
            variant="outlined"
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            multiline
          />
        </StyledInfoFieldContainer>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={!(title && comment && score)}
          onClick={() => {
            onClose();
            dispatch(
              updateReview({
                title,
                comment,
                score,
              })
            );
          }}
        >
          Update review
        </Button>
      </Box>
    </Modal>
  );
};

export default EditReviewModal;

const StyledInfoFieldContainer = styled.div`
  margin: 10px 0;
`;

const StyledSCphoto = styled.img`
  width: 500px;
`;

const StyledSC = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin: 15px 0 25px;
`;

const StyledModalTitle = styled(Typography)`
  margin: -16px -16px 0;
  padding: 16px;
  /* border-bottom: 1px solid #777; */
  background-color: #3f50b5;
  color: white;
  border-radius: 4px 4px 0 0;
`;
