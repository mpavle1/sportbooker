const express = require("express");
const router = express.Router();

const Review = require("../../models/Review");

router.get("/:reviewId", (req, res) => {
  Review.findOne({
    _id: req.params.reviewId,
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(400).json(err));
});

router.get("/", (req, res) => {
  Review.find()
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(400).json(err));
});

router.get("/sportCenter/:sportCenterId", (req, res) => {
  Review.find({
    sportCenterId: req.params.sportCenterId,
    status: 'approved'
  })
    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:userId", (req, res) => {
  Review.find({
    userId: req.params.userId,
  })
    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  Review.findOne({
    eventId: req.body.review.eventId,
    userId: req.body.review.userId,
  })
    .then((review) => {
      if (!!review) {
        return res
          .status(403)
          .json(
            "Your already left a review for this Sport Center, after this event"
          );
      }
      const newReview = new Review({
        ...req.body.review,
        status: "pending",
      });
      newReview
        .save()
        .then(() => res.status(200).send(newReview))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
});

router.delete("/", (req, res) => {
  const reviewId = req.body.reviewId;

  Review.findOneAndRemove({
    _id: reviewId,
  })
    .then(() => res.status(200).send(reviewId))
    .catch((error) => res.status(400).send(error));
});

router.patch("/approve", (req, res) => {
  Review.findOneAndUpdate(
    {
      _id: req.body.review._id,
    },
    {
      status: "approved",
    },
    {
      new: true,
    }
  )
    .then((review) => res.status(200).send(review))
    .catch((error) => res.status(400).send(error));
});

router.patch("/", (req, res) => {
  Review.findOne({
    _id: req.body.review._id,
  })
    .then((review) => {
      if (review.status !== "pending") {
        res
          .status(403)
          .send("You cannot edit review that have already been approved");
      }
      Review.findOneAndUpdate(
        {
          _id: req.body.review._id,
        },
        {
          ...req.body.review,
        },
        {
          new: true,
        }
      ).then((rev) => res.status(200).send(rev));
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
