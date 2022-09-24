import React, { Fragment } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import { Rating } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import StadiumIcon from "@mui/icons-material/Stadium";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { deleteReview } from "../../../../redux/actions/reviews";

const ReviewCard = ({ review, event, onEditReview }) => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locations);
  const sports = useSelector((state) => state.sports);
  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);

  if (sportCenters.length === 0 || users.length === 0) {
    return null;
  }

  const sportCenter = sportCenters.find((sc) => sc._id === event.sportCenterId);
  const user = users.find((u) => u._id === sportCenter?.userId);

  const renderReview = () => (
    <Fragment>
      {review.status === "pending" && (
        <StyledEventFiled style={{ color: "#fb8c00" }}>
          Pending approval from an admin
        </StyledEventFiled>
      )}
      <Rating name="read-only" value={review.score} readOnly precision={0.5} />
      <StyledReviewFiled>
        <b>You left this review on:</b>
        {format(new Date(review.date), "PPP")}
      </StyledReviewFiled>
      <StyledReviewFiled>
        <b>Title:</b>
        {review.title}
      </StyledReviewFiled>
      <StyledReviewFiled>
        <b>Comment:</b>
        {review.comment}
      </StyledReviewFiled>
    </Fragment>
  );

  const renderEvent = () => (
    <Fragment>
      <b>Event:</b>
      <StyledEventTitle>{event.title}</StyledEventTitle>
      <StyledEventFiled>
        <EventIcon color="primary" />
        {format(new Date(event.date), "PPP")}
      </StyledEventFiled>
      <StyledEventFiled>
        <AccessTimeIcon />
        {event.startTime}-{event.endTime}
      </StyledEventFiled>
      <StyledEventFiled>
        <StadiumIcon />
        {user?.name}
      </StyledEventFiled>
      <StyledEventFiled>
        <PlaceIcon color="error" />{" "}
        {locations.find((location) => location._id === event.locationId)?.name}
      </StyledEventFiled>
      <StyledEventFiled>
        <SportsHandballIcon color="success" />
        {sports.find((sport) => sport._id === event.sportId)?.name}
      </StyledEventFiled>
    </Fragment>
  );

  return (
    <StyledEventCard>
      {renderEvent()}
      <StyledDivider />
      {renderReview()}
      <StyledDivider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {review.status === "pending" && (
          <Tooltip title="Delete the review, only possible before an admin approves it">
            <DeleteIcon
              onClick={() => {
                if (confirm("Are you sure you want to delete this review?")) {
                  dispatch(deleteReview(review));
                }
              }}
              color="error"
            />
          </Tooltip>
        )}
        <Tooltip title="View the event">
          <VisibilityIcon
            onClick={() => window.location.replace(`/event/${event._id}`)}
            color="action"
          />
        </Tooltip>
        {review.status === "pending" && (
          <Tooltip title="Edit review">
            <EditIcon onClick={() => onEditReview()} color="primary" />
          </Tooltip>
        )}
      </div>
    </StyledEventCard>
  );
};

export default ReviewCard;

const StyledEventCard = styled.div`
  cursor: pointer;
  border: 1px solid #777;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 290px;
  padding: 10px;
  white-space: normal;
  /* height: 220px; */
`;

const StyledEventFiled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledReviewFiled = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: revert;
`;

const StyledEventTitle = styled.div`
  height: 20px;
  padding-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledDivider = styled.div`
  border-bottom: 1px solid #777;
`;
