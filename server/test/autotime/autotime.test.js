const chai = require("chai");
const {expect, assert} = chai;
const mongoose = require("mongoose");
const moment = require("moment");
const tk = require("timekeeper");
const chaiAsPromised = require("chai-as-promised");
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../..", ".env")
})
chai.use(chaiAsPromised);


const autotime = require("../../classes/autotime");

const users = require("../../models/user");
const machines = require("../../models/machines");

describe("Testing the robustness of the autotime API", function() {
    // Connect to the database
    before(function(done) {
        mongoose.connect(process.env.MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on("error", function() {
            throw new Error("Mongoose connection failed");
        });
        let called = false;
        mongoose.connection.on("connected", function() {
            if (!called) {
                called = !called;
                done()
            }
        })
    });
    // Get a user
    before(async function() {
        this.user = (await users.findOne({}).lean())._id;
    });
    // Get a machine
    before(async function() {
        this.machine = (await machines.findOne().lean())._id;
    })
    it("Gets reservation blocks a day", async function() {
        let current = 1597068000000; // Mon Aug 10 2020 10:00:00 GMT-0400 (GMT-04:00)
        var time = new Date(current);
        tk.freeze(time); // tk takes in a Date object
        let data = await autotime.viewAll(moment().format("MM-DD-YYYY"), this.machine);
        /**
         * TODO: A test case that is better at verifying the returned
         * array.
         * TODO: A way to make the sever options consistent on each
         * test (will come with the implementation of the admin
         * panel).
         */
        assert.typeOf(data,"array");
    })
})