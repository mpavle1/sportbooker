const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SportCenterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  capacity: {
    type: String,
    required: false
  },
  profilePhoto: {
    type: String,
    required: false
  },
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: false
  },
  sportIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sport',
    }
  ],
  stadium: {
    N: {
      active: { type: Boolean, default: false },
      sections: {
        A: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
    E: {
      active: { type: Boolean, default: false },
      sections: {
        A: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
    W: {
      active: { type: Boolean, default: false },
      sections: {
        A: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
    S: {
      active: { type: Boolean, default: false },
      sections: {
        A: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean, default: false }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
  }
});

module.exports = SportCenter = mongoose.model("sportCenter", SportCenterSchema);