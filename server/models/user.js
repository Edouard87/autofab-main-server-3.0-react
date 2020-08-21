/* The user schema for the application.
 * Stores all user-related data.
 */

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    options: Object,
    permission: {type: String, required: true},
    groups: {type: [String], required: false},
    strikes: {type: Number, default: 0},
    max_strikes: {type: Number, default: 10},
    suspended: {type: Boolean, default: false}
 })

var userModel = mongoose.model("user",userSchema);

module.exports = userModel;