const express = require("express");
const router = express.Router();

const Event = require("../../models/Event");

router.get("/", (req, res) => {
  Event.find({})
    .then((sports) => res.status(200).json(sports))
    .catch((err) => res.status(400).json(err));
});

router.get("/sportCenter/:sportCenterId", (req, res) => {
  Event.find({ sportCenter_id: req.params.sportCenterId })
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const event = req.body.event;

  const newEvent = new Event();
  newEvent.title = event.title;
  newEvent.description = event.description;
  newEvent.startTime = event.startTime;
  newEvent.endTime = event.endTime;
  newEvent.date = event.date;
  newEvent.active = event.active;
  newEvent.setByAdmin = event.setByAdmin;
  newEvent.sport = event.sport;
  newEvent.sportCenter_id = event.sportCenter_id;
  newEvent
    .save()
    .then(() => res.status(200).send(newEvent))
    .catch((error) => res.status(400).send(error));
});

router.patch("/", (req, res) => {
  Event.findOneAndUpdate(
    {
      _id: req.body.eventId,
    },
    {
      active: req.body.newState,
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

module.exports = router;
