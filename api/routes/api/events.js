const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

const Event = require("../../models/Event");
const Review = require("../../models/Review");
const Ticket = require("../../models/Ticket");

router.get("/", (req, res) => {
  Event.find({})
    .then((sports) => res.status(200).json(sports))
    .catch((err) => res.status(400).json(err));
});

router.get("/:eventId", (req, res) => {
  Event.findOne({ _id: req.params.eventId })
    .then((event) => res.status(200).json(event))
    .catch((err) => res.status(400).json(err));
});

router.get("/sportCenter/:sportCenterId", (req, res) => {
  Event.find({ sportCenterId: req.params.sportCenterId })
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/otherEventsFromSc/:sportCenterId/:eventId/:limit", (req, res) => {
  // console.log(req.params.eventId, ObjectId(req.params.eventId));
  Event.find({
    sportCenterId: req.params.sportCenterId,
    _id: { $nin: [ObjectId(req.params.eventId)] },
    date: {
      $gte: new Date().toISOString(),
    },
  })
    .limit(parseInt(req.params.limit, 10))
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json(err));
});

router.get(
  "/otherEventsForLocation/:sportCenterId/:locationId/:limit",
  (req, res) => {
    Event.find({
      locationId: req.params.locationId,
      sportCenterId: { $nin: [ObjectId(req.params.sportCenterId)] },
      date: {
        $gte: new Date().toISOString(),
      },
    })
      .limit(parseInt(req.params.limit, 10))
      .then((events) => res.status(200).json(events))
      .catch((err) => res.status(400).json(err));
  }
);

router.get("/sportCenterUpcomingEvents/:sportCenterId/:limit", (req, res) => {
  Event.find({
    sportCenterId: req.params.sportCenterId,
    date: {
      $gte: new Date().toISOString(),
    },
  })
    .sort({ date: 1, startTime: 1 })
    .limit(parseInt(req.params.limit, 10))
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/upcomingEventsForUser/:userId/:limit", (req, res) => {
  Ticket.find({
    userId: req.params.userId,
  })
    .then((tickets) => {
      const ticketIds = new Set([...tickets.map((ticket) => ticket.eventId)]);
      return Event.find({
        _id: { $in: [...ticketIds] },
        date: {
          $gte: new Date().toISOString(),
        },
      }).sort({
        date: 1,
        startTime: 1,
      });
    })
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json(err));
});

router.get("/getPastEventsForUser/:userId/", (req, res) => {
  Ticket.find({
    userId: req.params.userId,
  })
    .then((tickets) => {
      const eventIds = new Set([...tickets.map((ticket) => ticket.eventId)]);
      Event.find({
        _id: {
          $in: [...eventIds],
        },
        date: {
          $lt: new Date().toISOString(),
        },
      })
        .sort({
          date: -1,
          startTime: 1,
        })
        .then((events) => {
          res.status(200).json(events);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/getPastEventsForUserWithOutReviews/:userId/", (req, res) => {
  Ticket.find({
    userId: req.params.userId,
  })
    .then((tickets) => {
      Event.find({
        _id: {
          $in: [...new Set([...tickets.map((ticket) => ticket.eventId)])],
        },
        date: {
          $lt: new Date().toISOString(),
        },
      })
        .sort({
          date: -1,
          startTime: 1,
        })
        .then((events) => {
          Review.find({
            userId: req.params.userId,
          })
            .then((reviews) => {
              const reviewEventIds = new Set([
                ...reviews.map((review) => review.eventId),
              ]);
              const returnValue = events.filter(
                (event) => !reviewEventIds.includes(event._id)
              );

              res.status(200).json(returnValue);
            })
            .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/upcomingPopularEvents/:limit", (req, res) => {
  Ticket.aggregate([{ $group: { _id: "$eventId", count: { $sum: 1 } } }])
    .sort("-count")
    .then((events) => {
      const evnts = new Set([...events.map((event) => event._id)]);
      return Event.find({
        _id: { $in: [...evnts] },
        date: {
          $gte: new Date().toISOString(),
        },
      });
    })
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const event = req.body.event;
  const newEvent = new Event(event);
  newEvent
    .save()
    .then(() => res.status(200).send(newEvent))
    .catch((error) => res.status(400).send(error));
});

router.patch("/toggleActivated", (req, res) => {
  Event.findOneAndUpdate(
    {
      _id: req.body.eventId,
    },
    {
      active: req.body.newState.active,
      setByAdmin: req.body.newState.setByAdmin,
    },
    {
      new: true,
    }
  )
    .then((u) => {
      res.status(200).send(u);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch("/", (req, res) => {
  Event.findOneAndUpdate(
    {
      _id: req.body.event._id,
    },
    {
      $set: req.body.event,
    },
    {
      new: true,
    }
  )
    .then((u) => {
      res.status(200).send(u);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// @route POST api/events/delete
// @desc cancel ticket
// @access Private
router.post("/delete", (req, res) => {
  Event.findOneAndDelete({ _id: req.body.data.eventId })
    .then((ticket) => {
      res.status(200).json({ ticketId: req.params.eventId });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
