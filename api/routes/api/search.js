const express = require("express");
const router = express.Router();

const Location = require("../../models/Location");
const Event = require("../../models/Event");
const User = require("../../models/User");
const Sport = require("../../models/Sport");

router.get("/", (req, res) => {
  const { param, type } = req.query;
  switch (type) {
    case "location": {
      const name = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp("^" + name);
      Location.find({ name: re }).then((locations) => {
        res.status(200).json(locations);
      });
      break;
    }
    case "event": {
      const title = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp("^" + title);
      Event.find({ title: re }).then((events) => {
        res.status(200).json(events);
      });
      break;
    }
    case "sport": {
      const title = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp("^" + title);
      Sport.find({ name: re }).then((sports) => {
        res.status(200).json(sports);
      });
      break;
    }
    case "sportCenter": {
      const title = param.charAt(0).toUpperCase() + param.slice(1);
      const re = new RegExp("^" + title);
      User.find({ name: re, type: 'sportCenter' }).then((users) => {
        res.status(200).json(users);
      });
      break;
    }
    default:
      break;
  }
  return;
});

module.exports = router;
