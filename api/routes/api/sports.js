const express = require("express");
const router = express.Router();

const Sport = require("../../models/Sport");

router.get("/", (req, res) => {
    Sport.find({}).then((sports) => res.status(200).json(sports)).catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
    const name = req.body.sport;

    Sport.findOne({ name }).then(sport => {
        if (sport) {
            return res.status(404).json("A sport with that name already exists");
        }
        const newSport = new Sport();
        newSport.name = name;
        newSport.save()
            .then(() => res.status(200).send(newSport))
            .catch((error) => res.status(400).send(error));
    });
});

router.delete("/", (req, res) => {
    const name = req.body.sport;

    Sport.findOneAndRemove({
        name
    }).then(() => {
        res.send(name);
    })
});

module.exports = router;