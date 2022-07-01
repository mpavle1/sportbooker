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
  Event.find({ sportCenter_id: req.params.sportCenterId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:userId", (req, res) => {
  Event.find({ sportCenter_id: req.params.sportCenterId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:eventId", (req, res) => {
  Event.find({ sportCenter_id: req.params.sportCenterId })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
});

router.post("/", async (req, res) => {
  const eventBody = req.body;

  // const newTicket = new Ticket();
  // newTicket.sportCenter_id = eventBody.sportCenter_id;
  // newTicket.user_id = eventBody.user_id;
  // newTicket.event_id = eventBody.event_id;
  // newTicket.stand = eventBody.stand;
  // newTicket.section = eventBody.section;
  // newTicket.seat = {
  //   row: eventBody.row,
  //   column: eventBody.column
  // };
  // newTicket
  //   .save()
  //   .then(() => res.status(200).send(newTicket))
  //   .catch((error) => res.status(400).send(error));

  // testiraj ovo ispod

  try {
    const promises = eventBody.seats.map(function (seat) {
      const newTicket = new Ticket();
      newTicket.sportCenter_id = eventBody.sportCenter_id;
      newTicket.user_id = eventBody.user_id;
      newTicket.event_id = eventBody.event_id;
      newTicket.stand = eventBody.stand;
      newTicket.section = eventBody.section;
      newTicket.seat = {
        row: seat.row,
        column: seat.column
      };
      return newTicket.save();
    });
  
    await Promise.all(promises);

    res.status(200).send(newTicket);
  } catch (error) {
    res.status(400).send(error);
  }
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
