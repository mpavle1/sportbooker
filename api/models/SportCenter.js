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
  ],
  stadium: {
    N: {
      active: { type: Boolean },
      sections: {
        A: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
    E: {
      active: { type: Boolean },
      sections: {
        A: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
    W: {
      active: { type: Boolean },
      sections: {
        A: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
    S: {
      active: { type: Boolean },
      sections: {
        A: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        B: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        C: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        D: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        E: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
        F: { active: { type: Boolean }, row: { type: Number, default: 0 }, column: { type: Number, default: 0 } },
      },
    },
  }
});

module.exports = SportCenter = mongoose.model("sportCenter", SportCenterSchema);