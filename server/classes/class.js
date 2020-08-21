const reservations = require("../models/reservation2");
const mongoose = require("mongoose");
const siteOps = require("../models/siteoption");
let subSet = require("../helpers/sets/subSet");
Set.prototype.subSet = subSet;
const machines = require("../models/machines");
const machineTypes = require("../models/machineTypes");
const moment = require("moment");

class test {
    async doSomething(query) {
        let machine = await machines.find(query);
        let now = moment().valueOf();
        return machine;
    }
}
module.exports = test;