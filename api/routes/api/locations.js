const express = require("express");
const router = express.Router();

const Location = require("../../models/Location");

router.get("/", (_req, res) => {
  Location.find({})
    .then((location) => res.status(200).json(location))
    .catch((err) => res.status(400).json(err));
});

router.patch("/", (req, res) => {
  Location.findOneAndUpdate(
    { _id: req.body.location._id },
    {
      $set: req.body.location,
    },
    {
      new: true,
    }
  )
    .then((location) => res.status(200).json(location))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const name = req.body.location.name;

  Location.findOne({ name }).then((location) => {
    if (location) {
      return res.status(400).json("A location with that name already exists");
    }
    const newLocation = new Location(req.body.location);
    newLocation
      .save()
      .then(() => res.status(200).send(newLocation))
      .catch((error) => res.status(500).send(error));
  });
});

router.delete("/", (req, res) => {
  const { location } = req.body;

  Location.findOneAndRemove({
    _id: location._id,
  }).then((location) => {
    res.send(location);
  }).catch((error) => res.status(500).send(error));
});

module.exports = router;
