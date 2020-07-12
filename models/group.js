const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    display: {type: Number, required: true}
})

const groupModel = mongoose.model("group",groupSchema);

module.exports = groupModel;