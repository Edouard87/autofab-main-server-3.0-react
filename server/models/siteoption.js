const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const siteOptionSchema = new mongoose.Schema({
    userEdit: {type: Boolean, required: true},
    displayName: {type: String, required: true},
    key: {type: Number, required: true},
    valueNumber: Number,
    valueArray: Array,
    description: String
})

siteOptionSchema.post('save', function (doc) {
//   console.log('postsave')
});

const siteOps = mongoose.model("site option", siteOptionSchema);

module.exports = siteOps;