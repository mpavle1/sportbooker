const express = require("express");
const router = express.Router();

const Ticket = require("../../models/Ticket");

router.get("/", (req, res) => {
    Ticket.find({})
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/:ticketId", (req, res) => {
  Event.findOne({ _id: req.params.ticketId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/sportCenter/:sportCenterId", (req, res) => {
  Event.find({ sportCenterId: req.params.sportCenterId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:userId", (req, res) => {
  Event.find({ sportCenterId: req.params.sportCenterId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:eventId", (req, res) => {
  Event.find({ sportCenterId: req.params.sportCenterId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/event/:eventId", (req, res) => {
  Ticket.find({ eventId: req.params.eventId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.post("/", async (req, res) => {
  const eventBody = req.body;

  // ubaciti proveru da li su vec bookirane karte sa tim mestima

  const promises = eventBody.seats.map(function (seat) {
    const newTicket = new Ticket();
    newTicket.sportCenterId = eventBody.sportCenterId;
    newTicket.userId = eventBody.userId;
    newTicket.eventId = eventBody.eventId;
    newTicket.stand = eventBody.stand;
    newTicket.section = eventBody.section;
    newTicket.seat = { ...seat };
    return newTicket.save();
  });

  await Promise.all(promises)
  .then((response) => {
    res.status(200).send(response);
  }).catch((error) => res.status(400).send(error));
});

router.patch("/", (req, res) => {
  Event.findOneAndUpdate(
    {
      _id: req.body.ticketId,
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
