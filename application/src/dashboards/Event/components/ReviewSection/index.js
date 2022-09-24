import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import Alert from "@mui/material/Alert";

import { getAllSCEvents } from "../../../../redux/actions/events";

const Reviews = ({ sportCenterId }) => {
  const reviews = useSelector((state) => state.reviews.sportCenter);
  const [events, setEvents] = useState([]);

  if (reviews.length === 0) {
    return null;
  }

  useEffect(() => {
    getAllSCEvents(sportCenterId).then((response) =>
      setEvents([...response.data])
    );
  }, []);

  if (events.length === 0) {
    return null;
  }

  // console.log({events, reviews});

  return (
    <Fragment>
      <div
        style={{
          marginBottom: "20px",
          width: "fit-content",
        }}
      >
        <Alert
          icon={false}
          severity="success"
          sx={{
            fontWeight: "bold",
          }}
        >
          Reviews of this sport center
        </Alert>
      </div>
      <div>
        {reviews.map((review) => {
          const event = events.find((ev) => ev._id === review.eventId);
          console.log(event);
          if (!event) {
            return null;
          }
          return <ReviewCard review={review} key={review._id} event={event} />;
        })}
      </div>
    </Fragment>
  );
};

export default Reviews;
