import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { Rating } from "@mui/material";

const ReviewCard = ({ review, event }) => {
  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);

  if (sportCenters.length === 0 || users.length === 0) {
    return null;
  }

  const user = users.find((u) => u._id === review.userId);

  const renderReview = () => (
    <StyledReview>
      <StyledReviewTitle>
        <b>{review.title}</b>
        <div
          style={{
            color: "#777",
            fontSize: "14px",
          }}
        >
          {format(new Date(event.date), "PPP")}
        </div>
      </StyledReviewTitle>
      <StyledReviewFiled>{review.comment}</StyledReviewFiled>
    </StyledReview>
  );

  const renderInfo = () => (
    <StyledInfo>
      <div>
        <b>
          {user.name} {user.lastName}
        </b>
        <Rating
          name="read-only"
          value={review.score}
          readOnly
          precision={0.5}
        />
      </div>
      <div>
        <b>Event:</b>
        <StyledEventTitle
          onClick={() => window.location.replace(`/event/${event._id}`)}
        >
          {event.title}
        </StyledEventTitle>
      </div>
    </StyledInfo>
  );

  return (
    <StyledEventCard>
      {renderInfo()}
      {renderReview()}
    </StyledEventCard>
  );
};

export default ReviewCard;

const StyledEventCard = styled.div`
  border: 1px solid #777;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 500px;
  padding: 10px;
  white-space: normal;
  height: 170px;
  margin-bottom: 20px;
`;

const StyledReviewFiled = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: revert;
`;

const StyledReviewTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: revert;
`;

const StyledEventTitle = styled.div`
  cursor: pointer;
  height: 20px;
  padding-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 170px;
`;
