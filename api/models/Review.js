const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  sportCenterId: {
    type: Schema.Types.ObjectId,
    ref: "SportCenter",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

module.exports = Review = mongoose.model("review", ReviewSchema);
