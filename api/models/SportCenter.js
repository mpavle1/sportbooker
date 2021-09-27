const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SportCenterSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  capacity: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  sports: [
    {
      type: String
    }
  ]
});

module.exports = SportCenter = mongoose.model("sportCenter", SportCenterSchema);