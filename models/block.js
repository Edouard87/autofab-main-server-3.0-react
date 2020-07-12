const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    index: Number,
    date: String,
    available: Boolean,
    startMilsPastMidnight: Number,
    endMilsPastMidnight: Number,
    waitingList: Array,
    machine: String
})

const blockModel = mongoose.model("block",blockSchema);

module.exports = blockModel;