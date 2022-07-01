const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    sportCenter_id: {
        type: String,
        required: true
    },
    event_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    stand: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    seat: {
        row: {
            type: Number,
            required: true
        },
        column: {
            type: Number,
            required: true
        }
    }
});

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
