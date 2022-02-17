const express = require("express");
const router = express.Router();

const SportCenter = require("../../models/SportCenter");

router.get("/:sportCenterId", (req, res) => {
  SportCenter.findOne({ _id: req.params.sportCenterId })
    .then((sportCenter) => res.status(200).json(sportCenter))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;