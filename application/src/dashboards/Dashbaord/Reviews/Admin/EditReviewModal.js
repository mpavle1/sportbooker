import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Box, Typography, Modal, TextField, Button } from "@material-ui/core";
import { Rating } from "@mui/material";

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

const EditReviewModal = ({ onClose, review }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(review.title);
  const [comment, setComment] = useState(review.comment);

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
        <StyledInfoFieldContainer>
          <Typography component="legend">
            Users rating (cannot be edited)
          </Typography>
          <Rating readOnly value={review.score} precision={0.5} />
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
          disabled={!(title && comment)}
          onClick={() => {
            onClose();
            dispatch(
              updateReview({
                ...review,
                title,
                comment,
              })
            );
            alert("Review has been updated");
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

const StyledModalTitle = styled(Typography)`
  margin: -16px -16px 0;
  padding: 16px;
  /* border-bottom: 1px solid #777; */
  background-color: #3f50b5;
  color: white;
  border-radius: 4px 4px 0 0;
`;
