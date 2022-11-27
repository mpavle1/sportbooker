const express = require("express");
const router = express.Router();

const Sport = require("../../models/Sport");

router.get("/", (req, res) => {
  Sport.find({})
    .then((sports) => res.status(200).json(sports))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const name = req.body.sport;

  Sport.findOne({ name }).then((sport) => {
    if (sport) {
      return res.status(400).json("A sport with that name already exists");
    }
    const newSport = new Sport();
    newSport.name = name;
    newSport
      .save()
      .then(() => res.status(200).send(newSport))
      .catch((error) => res.status(500).send(error));
  });
});

router.delete("/", (req, res) => {
  const { sport } = req.body;

  Sport.findOneAndRemove({
    _id: sport._id,
  }).then((sport) => {
    res.status(200).send(sport);
  }).catch((error) => res.status(500).send(error));
});

module.exports = router;
