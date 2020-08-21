// /**
//  * This test creates a new reservation using the first user it finds
//  */

// const autoreserve = require("../../classes/autoreserve");
// const users = require("../../models/user");
// const sinon = require('sinon');
// const {expect, assert} = require("chai")
// const moment = require("moment");

// const machines = require("../../models/machines");

// let sandbox = sinon.createSandbox();
// const db = require("../../classes/db");
// const mongoose = require("mongoose");

// let momentProto = moment.fn;
// /**
//  * Be very careful. If you do _any_ async tests, the describe
//  * should be async, else the test runner will ignore the promise
//  * resolution and will conclude that the test has failed.
//  */
//  describe("Creates a reservation", function() {
//     before(function (done) {
//         mongoose.connect("mongodb://localhost/autofab3", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         mongoose.connection.on("error", err => {
//             console.log(err);
//         });
//         /**
//          * This connection event must call done to inform
//          * the runner that the connection to mongodb has
//          * been established. If a test is run and there is
//          * no connecton to mongodb, the models will not
//          * have their methods and the tests will fail.
//          */
//         mongoose.connection.on("connected", function () {
//             console.log("connected!")
//             done();
//         });
//     });
//     it("Creates a reservation", async function() {
//         sandbox.stub(momentProto, 'valueOf');
//         momentProto.valueOf.returns(1597032000000)
//         query = {name: "Edouard"}
//         let data = await autoreserve.test(query)
//         assert.typeOf(data, "Array");
//     })
//  })