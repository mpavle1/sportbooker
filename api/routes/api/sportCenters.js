const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../application/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();
const SportCenter = require("../../models/SportCenter");
const User = require("../../models/User");

router.post("/profilePhoto", upload.single("photo"), (req, res) => {
  SportCenter.findOneAndUpdate(
    {
      _id: req.body.sportCenterId,
    },
    {
      profilePhoto: `/public/images/${req.file.filename}`,
    },
    {
      new: true,
    }
  )
    .then((sportCenter) => {
      User.findOne({ _id: sportCenter.userId }).then((user) => {
        delete user["password"];
        res.status(200).send({
          user,
          sportCenter,
        });
      });
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/:sportCenterId", (req, res) => {
  SportCenter.findOne({ _id: req.params.sportCenterId })
    .then((sportCenter) => res.status(200).json(sportCenter))
    .catch((err) => res.status(400).json(err));
});

router.get("/", (req, res) => {
  SportCenter.find()
    .then((sportCenter) => res.status(200).json(sportCenter))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
