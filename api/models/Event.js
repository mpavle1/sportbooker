const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  sportCenterId: {
    type: Schema.Types.ObjectId,
    ref: "SportCenter",
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  setByAdmin: {
    type: Boolean,
    required: true,
  },
  sportId: {
    type: Schema.Types.ObjectId,
    ref: "Sport",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  locationId: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  photos: [
    {
      type: String,
    },
  ],
});

module.exports = Event = mongoose.model("event", EventSchema);
