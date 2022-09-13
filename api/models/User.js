const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);