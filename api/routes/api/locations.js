const express = require("express");
const router = express.Router();

const Location = require("../../models/Location");

router.get("/", (req, res) => {
  Location.find({})
    .then((sports) => res.status(200).json(sports))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const name = req.body.location;

  Location.findOne({ name }).then((location) => {
    if (location) {
      return res.status(404).json("A location with that name already exists");
    }
    const newLocation = new Location();
    newLocation.name = name;
    newLocation
      .save()
      .then(() => res.status(200).send(newLocation))
      .catch((error) => res.status(400).send(error));
  });
});

router.delete("/", (req, res) => {
  const name = req.body.location;

  Location.findOneAndRemove({
    name,
  }).then(() => {
    res.send(name);
  });
});

module.exports = router;
