import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddReviewModal from "./AddReviewModal";
import EditReviewModal from "./EditReviewModal";
import EventCard from "./EventCard";
import ReviewCard from "./ReviewCard";

import { getAllUserReviews } from "../../../../redux/actions/reviews";
import { getPastEventsForUser } from "../../../../redux/actions/events";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const reviews = useSelector((state) => state.reviews.user);

  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [isAddReviewModalVisible, setIsAddReviewModalVisible] = useState(false);
  const [isEditReviewModalVisible, setIsEditReviewModalVisible] =
    useState(false);
  const [editReview, setEditReview] = useState({});
  const [editEvent, setEditEvent] = useState({});

  useEffect(() => {
    dispatch(getAllUserReviews(user._id));
    getPastEventsForUser(user._id).then((response) =>
      setEvents([...response.data])
    );
  }, []);

  const handleOnReviewClick = (event) => {
    setIsAddReviewModalVisible(true);
    setEvent(event);
  };

  const handleOnEditReview = (review, ev) => {
    setIsEditReviewModalVisible(true);
    setEditReview(review);
    setEditEvent(ev);
  };

  const renderEvents = () => {
    if (events.length === 0) {
      return (
        <div>
          Looks like you havent attended any events yet. After you attend an
          event you can leave a review for the Sport Center at which it was
          heald at
        </div>
      );
    }

    const reviewEventIds = reviews.map((review) => review.eventId);
    const eventsWithOutReviews = events.filter(
      (event) => !reviewEventIds.includes(event._id)
    );

    if (eventsWithOutReviews.length === 0) {
      return null;
    }

    return (
      <Fragment>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "20px",
            borderBottom: "1px solid #777",
            paddingBottom: "15px",
          }}
        >
          Events that you have attended but still have not left a review
        </div>

        <div
          style={{
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {eventsWithOutReviews.map((event) => (
            <div
              key={event._id}
              style={{
                display: "inline-block",
                marginRight: "20px",
              }}
            >
              <EventCard
                event={event}
                onReviewClick={() => handleOnReviewClick(event)}
              />
            </div>
          ))}
        </div>
      </Fragment>
    );
  };

  const renderReviews = () => {
    if (events.length === 0 || reviews.length === 0) {
      return null;
    }

    return (
      <Fragment>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            borderBottom: "1px solid #777",
            paddingBottom: "15px",
          }}
        >
          Reviews you have left:
        </div>

        <div
          style={{
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {reviews.map((review) => {
            const ev = events.find((e) => e._id === review.eventId);
            return (
              <div
                key={`review${review._id}`}
                style={{
                  display: "inline-block",
                  marginRight: "20px",
                }}
              >
                <ReviewCard
                  review={review}
                  event={ev}
                  onEditReview={() => handleOnEditReview(review, ev)}
                />
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  };

  return (
    <div>
      {isAddReviewModalVisible && (
        <AddReviewModal
          onClose={() => {
            setIsAddReviewModalVisible(false);
            setEvent({});
          }}
          event={event}
        />
      )}
      {isEditReviewModalVisible && (
        <EditReviewModal
          onClose={() => {
            setIsEditReviewModalVisible(false);
            setEditReview({});
            setEditEvent({});
          }}
          event={editEvent}
          review={editReview}
        />
      )}
      {renderEvents()}
      {renderReviews()}
      <br />
    </div>
  );
};

export default User;
