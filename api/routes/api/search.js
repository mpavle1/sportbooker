const express = require("express");
const router = express.Router();

const Location = require("../../models/Location");
const Event = require("../../models/Event");
const User = require("../../models/User");
const Sport = require("../../models/Sport");
const SportCenter = require("../../models/SportCenter");

router.get("/", (req, res) => {
  const { param, type } = req.query;
  switch (type) {
    case "location": {
      const name = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp(name);
      Location.find({ name: re }).then((locations) => {
        res.status(200).json(locations);
      });
      break;
    }
    case "event": {
      const title = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp(title);
      Event.find({ title: re }).then((events) => {
        res.status(200).json(events);
      });
      break;
    }
    case "sport": {
      const title = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp(title);
      Sport.find({ name: re }).then((sports) => {
        res.status(200).json(sports);
      });
      break;
    }
    case "sportCenter": {
      const title = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp(title);
      User.find({ name: re, type: "sportCenter" })
        .then(async (users) => {
          const sportCenters = await SportCenter.find({
            userId: { $in: users.map((user) => user._id) },
          });
          const returnValue = await sportCenters.map((sportCenter) => {
            return {
              _id: sportCenter._id,
              name: users.find(
                (user) => user._id.toString() === sportCenter.userId.toString()
              ).name,
            };
          });
          res.status(200).json(returnValue);
        })
        .catch((err) => res.status(400).json(err));
      break;
    }
    default:
      break;
  }
  return;
});

router.get("/sportCenter/:sportCenterId", (req, res) => {
  Event.find({ sportCenter_id: req.params.sportCenterId })
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/location/:locationId", (req, res) => {
  Location.findOne({ _id: req.params.locationId })
    .then((location) => {
      Event.find({ location: location.name })
        .then((events) => {
          res.status(200).json(events);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/sport/:sportId", (req, res) => {
  Sport.findOne({ _id: req.params.sportId })
  .then((sport) => {
    Event.find({ sport: sport.name })
      .then((events) => {
        res.status(200).json(events);
      })
      .catch((err) => res.status(400).json(err));
  })
  .catch((err) => res.status(400).json(err));
});

router.get("/event/:eventId", (req, res) => {
  Event.findOne({ _id: req.params.eventId })
    .then((event) => res.status(200).json(event))
    .catch((err) => res.status(400).json(err));
});

router.get("/getObject/:type/:objectId", (req, res) => {
  switch (req.params.type) {
    case 'location':
      Location.findOne({ _id: req.params.objectId })
        .then((location) => res.status(200).json(location))
        .catch((err) => res.status(400).json(err));
      break;
    case 'sport':
      Sport.findOne({ _id: req.params.objectId })
        .then((sport) => res.status(200).json(sport))
        .catch((err) => res.status(400).json(err));
      break;
    case 'sportCenter':
      SportCenter.findOne({ _id: req.params.objectId })
        .then((sportCenter) => res.status(200).json(sportCenter))
        .catch((err) => res.status(400).json(err));
      break;
    case 'event':
      Event.findOne({ _id: req.params.objectId })
        .then((event) => res.status(200).json(event))
        .catch((err) => res.status(400).json(err));
      break;
    default:
      break;
  }
});

module.exports = router;
