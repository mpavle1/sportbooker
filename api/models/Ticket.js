const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    sportCenterId: {
        type: Schema.Types.ObjectId,
        ref: 'SportCenter',
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
