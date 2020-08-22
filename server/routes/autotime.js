/**
 * The router's job is to plug the correct
 * values into the class and to relay the information
 * returned by the class to the user.
 */

const express = require("express");
const router = express.Router();

const blocks = require("../models/block");
const siteOps = require("../models/siteoption");
const milsPastMidnightToUnixTime = require("../helpers/milsAfterMidnightToUnixTime");
const indexToMilsAfterMidnight = require("../helpers/indexToMilsAfterMidnight");
const moment = require("moment")
const reservations = require("../models/reservation2");

Set.prototype.difference = require("../helpers/sets/difference");

const autotime = require("../classes/autotime");

/**
 * Current:
 * Expects a query to determine what should be sent
 * Passing an empty query returns everything. Returns
 * the times the user can select.
 * Future:
 * The special query showRecmmended will only show
 * the blocks that were configured and set to recommended.
 * If popularOptions has not been configured, send an error
 * that the configuration was not made (404)
 */
router.get("/view", async function(req, res) {
    try {
        res.send(await autotime.viewAll(req.query.date, req.query.machine));
    } catch(err) {
        res.status(500);
        res.end();
    }
});

router.get("/days/view", async (req, res) => {
    // Returns the days the user can select.
    // 500 errors are automatically handled in app.js
    let openDays = await siteOps.findOne({key: 4});
    let daysAhead = await siteOps.findOne({key: 5});
    let dayIndex = moment().isoWeekday() - 1; // moment().isoWeekday() returns indexed
    // from 1 - 7 where 1 is Monday. We want 0 to 6 where 0 is Monday.
    let dateSelector = new Array();
    console.log("Days ahead", daysAhead.valueNumber)
    for (let i = 0; i < daysAhead.valueNumber; i++) {
        if (dayIndex == 7) {
            dayIndex = 0;
        }
        if (openDays.valueArray.includes(dayIndex)) {
            let day = moment().add(i, 'd').format('MM-DD-yyy');
            dateSelector.push(day);
        }
        dayIndex++;
    }
    res.send(dateSelector);
})

module.exports = router;