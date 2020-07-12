const mongoose = require("mongoose");

const permSchema = new mongoose.Schema({
    name: String,
    permittedActions: [String]
})

const permModel = mongoose.model("permission",permSchema);
module.exports = permModel;