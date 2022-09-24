const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

module.exports = Location = mongoose.model("location", LocationSchema);
