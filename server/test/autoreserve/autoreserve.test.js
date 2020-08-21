const chai = require("chai");
const {expect, assert} = chai;
const mongoose = require("mongoose");
const moment = require("moment");
const tk = require("timekeeper");
const chaiAsPromised = require("chai-as-promised");
const agenda = require("../../agenda");

/**
 * chaiAsPromised is used to handle
 * async/await functions and is needed
 * for everything to work correctly.
 */

chai.use(chaiAsPromised);

// Models

const users = require("../../models/user");
const machines = require("../../models/machines");
const autoreserve = require("../../classes/autoreserve");

describe("Creates a reservation", function() {
    before(function(done) {
        /**
         * Configute agenda
         */
        agenda.start().then(() => {
            done();
        }).catch(err => {
            throw err;
        })
    })
    before(function(done) {
        mongoose.connect("mongodb://localhost/autofab3", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on("error", function() {
            console.log(err);
        });
        let called = false;
        mongoose.connection.on("connected", function() {
            /**
             * Mongoose will try to reconnect
             * if there is an error. This is
             * important, as errors may break the
             * connection, but it is very
             * important not to call done again if
             * this happens,
             */
            if (!called) {
                console.log("connected!")
                done();
                called = !called;
            }
        });
    });
    beforeEach(function(done) {
        mongoose.connection.dropCollection("reservations").then (res => {
            done();
        }).catch(err => {
            if (err.codeName == 'NamespaceNotFound') {
                /**
                 * This means the collection was already
                 * dropped. That is fine. Note that
                 * done does not end the function, (hence the
                 * use of return).
                 */
                return done()
            }
            throw err;
        })
    });
    beforeEach(function(done) {
        getData().then(dbData => {
            this.machine = dbData.machine._id;
            this.user = dbData.user._id;
            done();
        }).catch(err => {
            throw err;
        });
    });
    it("Should test the server time skipping", async function() {
        // Set time
        let current = 1597032000000;
        var time = new Date(current);
        tk.freeze(time); 
        let returnedTime = await autoreserve.test();
        expect(returnedTime).to.be.equal(current);
        let then = current + 8640000000;
        tk.travel(then)
        returnedTime = await autoreserve.test();
        expect(returnedTime).to.be.equal(then);
    });
    it("Should create a reservation", async function() {
        // Set time to 
        // Mon Aug 10 2020 10:00:00 GMT-0400 (GMT-04:00)
        let now = 1597068000000;
        tk.freeze(now);
        // Make a new reservation
        let blocks = [moment().hours()];
        let returned = await autoreserve.new(this.user,
            moment().format("MM-DD-YYYY"),
            this.machine, blocks,
            "Test reservation");
        expect(returned).to.be.equal(200);
    });
    it ("Should create a reservation and mark it as started", async function() {
        // Set time to 
        // Mon Aug 10 2020 GMT-0400 (GMT-04:00)
        let now = 1597057200000; // 7:00:00 AM
        let later = 1597068000000; // 10:00:00 AM
        tk.freeze(now);
        let blocks = [10]; // Don't pick a closed block!
        // Make a reservation
        await autoreserve.new(this.user, 
            moment().format("MM-DD-YYYY"), 
            this.machine, 
            blocks, "Test");
        // Skip forward in time
        tk.travel(later);
        // Mark the reservation as done
        let returned = await autoreserve.setStarted(this.user);
        // Test
        expect(returned).to.be.equal(200);
    });
    it("Should create a reservation but marking as started will fail", async function() {
        /**
         * This should not work as the reservation takes place later. A validation
         * error should occur.
         */
        // Set time to 
        // Mon Aug 10 2020 GMT-0400 (GMT-04:00)
        let now = 1597057200000; // 7:00:00 AM
        let later = 1597071600000; // 11:00:00 AM
        tk.freeze(now);
        let blocks = [10]; // Don't pick a closed block!
        // Make a reservation
        await autoreserve.new(this.user,
            moment().format("MM-DD-YYYY"),
            this.machine,
            blocks, "Test");
        // Skip forward in time
        tk.travel(later);
        // try to mark as completed
        expect(autoreserve.setStarted(this.user)).to.eventually.be.rejected;
    });
    it("Should create a reservation, but never mark it as started", function(done) {
        // /**
        //  * A reservation is made 
        //  */
        // // Mon Aug 10 2020 GMT-0400 (GMT-04:00)
        // let now = 1597057200000; // 7:00:00 AM
        // let later = 1597071600000; // 11:00:00 AM
        // tk.freeze(now);
        // let blocks = [10];
        // await autoreserve.new(this.user,
        //     moment().format("MM-DD-YYYY"),
        //     this.machine,
        //     blocks, "Test");
        // tk.travel(later);
        // // 
        // expect(autoreserve.setStarted(this.user)).to.eventually.be.rejected;
        done();
    });
});


/**
 * Get the data needed to make a
 * reservation.
 */
async function getData() {
    let findUser = users.findOne().lean();
    let findMachine = machines.findOne().lean();
    let search = [findUser, findMachine];
    let data = await Promise.all(search);
    let user = data[0];
    let machine = data[1];
    return {user, machine};
}
