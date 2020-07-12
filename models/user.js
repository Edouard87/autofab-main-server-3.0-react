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
    groups: {type: [String], required: false}
 })

var userModel = mongoose.model("user",userSchema);

module.exports = userModel;