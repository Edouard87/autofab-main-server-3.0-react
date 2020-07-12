const mongoose = require("mongoose");

const machineTypeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String
})

const machineTypeModel = mongoose.model("machine type", machineTypeSchema);

module.exports = machineTypeModel;