const express = require("express");
const router = express.Router();

const Event = require("../../models/Event");

router.get("/", (req, res) => {
    Event.find({}).then((sports) => res.status(200).json(sports)).catch((err) => res.status(400).json(err));
});

router.get("/sportCenter", (req, res) => {
    Event.find({ sportCenter_id: req.body.sportCenter_id }).then((events) => res.status(200).json(events)).catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
    const event = req.body.event;

    // Events.findOne({ title }).then(event => {
    //     if (event) {
    //         return res.status(400).json("An event with that name already exists");
    //     }
        const newEvent = new Event();
        newEvent.title = event.title;
        newEvent.description = event.description;
        newEvent.duration = event.duration;
        newEvent.date = event.date;
        newEvent.active = event.active;
        newEvent.setByAdmin = event.setByAdmin;
        newEvent.sport = event.sport;
        newEvent.sportCenter_id = event.sportCenter_id;
        newEvent.save()
            .then(() => res.status(200).send(newEvent))
            .catch((error) => res.status(400).send(error));
    // });
});

// router.delete("/", (req, res) => {
//     const name = req.body.location;

//     Location.findOneAndRemove({
//         name
//     }).then(() => {
//         res.send(name);
//     })
// });

module.exports = router;
