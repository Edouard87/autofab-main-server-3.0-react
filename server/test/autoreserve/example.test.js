const {expect, assert} = require("chai");
const mongoose = require("mongoose");
const users = require("../../models/user");

/**
 * Very important: You cannot have a functon that is async and uses
 * done(). Either it is async, or it uses done(), not both!
 */

describe("Test function", function() {
    before(function (done) {
        mongoose.connect("mongodb://localhost/autofab3",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on("error", function (err) {
            console.log(err);
        });
        mongoose.connection.on("connected", function() {
            done();
        });
    })
    it("This is an async function", async function() {
        try {
            let allUsers = await users.find({});
            assert.typeOf(allUsers, "Array");
        } catch(err) {
            console.log(err);
        }
    })
})