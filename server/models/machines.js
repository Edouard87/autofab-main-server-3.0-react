const mongoose = require("mongoose");
const machineTypes = require("../models/machineTypes");

const machineSchema = new mongoose.Schema({
    name: String,
    type: {type: String, required: true},
    tags: [String],
    description: String,
    imageFile: String,
    status: {type: Number, required: true},
    statusReason: String
})

machineSchema.pre('save', async function(next) {
    /* Check that the type exists
     * The _id is that of the machine, not
     * that of the type
     */
    let machineType = await machineTypes.findById(this.type);
    if (!machineType) {
        // The type does not exist
        return next(new Error(400))
    }
    // The type exists
    next();
})

const machineModel = mongoose.model("machine",machineSchema);

module.exports = machineModel;