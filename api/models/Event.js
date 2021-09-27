const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    sportCenter_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true 
    },
    active: {
        type: Boolean,
        required: true 
    },
    setByAdmin: {
        type: Boolean,
        required: true 
    },
    sport: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    startTime: {
        type: String,
        required: true 
    },
    endTime: {
        type: String,
        required: true 
    }
});

module.exports = Event = mongoose.model("event", EventSchema);
