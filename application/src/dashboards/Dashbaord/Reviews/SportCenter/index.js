import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Alert from "@mui/material/Alert";

import ReviewCard from "./ReviewCard";

import { getAllSportCenterReviews } from "../../../../redux/actions/reviews";
import { getAllSCEvents } from "../../../../redux/actions/events";

const SportCenter = () => {
  const dispatch = useDispatch();

  const sportCenter = useSelector((state) => state.auth.sportCenter);
  const reviews = useSelector((state) => state.reviews.sportCenter);

  const [events, setEvents] = useState([]);

  const calculateRating = () => {
    if (reviews.length === 0) {
      return null;
    }

    const sumScore = reviews.reduce(function (acc, obj) {
      return acc + obj.score;
    }, 0);

    return sumScore / reviews.length;
  };

  useEffect(() => {
    dispatch(getAllSportCenterReviews(sportCenter._id));
    getAllSCEvents(sportCenter._id).then((response) =>
      setEvents([...response.data])
    );
  }, []);

  const renderScore = () => {
    return (
      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Review Statisctics
        </div>
        <StyledScore>
          <Alert severity="success">Number of reviews: {reviews.length}</Alert>
          <Alert severity="success">
            Average Score: {calculateRating()} / 5
          </Alert>
        </StyledScore>
      </div>
    );
  };

  const renderReviews = () => {
    if (events.length === 0 || reviews.length === 0) {
      return <div>No reviews to show</div>;
    }

    return (
      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Your reviews
        </div>
        <div>
          {reviews.map((review) => {
            const event = events.find((ev) => ev._id === review.eventId);
            console.log(event);
            if (!event) {
              return null;
            }
            return (
              <ReviewCard review={review} key={review._id} event={event} />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <StyledDashobardContainer>
        <div>{renderReviews()}</div>
        {renderScore()}
      </StyledDashobardContainer>
    </Fragment>
  );
};

export default SportCenter;

const StyledDashobardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledScore = styled.div`
  border: 1px solid #777;
  border-radius: 5px;
  display: flex;
  width: 100%;
  padding: 15px;
  flex-direction: column;
  gap: 20px;
  height: 116px;
  width: 300px;
`;
