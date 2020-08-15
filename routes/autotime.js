const express = require("express");
const router = express.Router();

const blocks = require("../models/block");
const siteOps = require("../models/siteoption");
const milsPastMidnightToUnixTime = require("../helpers/milsAfterMidnightToUnixTime");
const indexToMilsAfterMidnight = require("../helpers/indexToMilsAfterMidnight");
const moment = require("moment")
const reservations = require("../models/reservation2");

Set.prototype.difference = require("../helpers/sets/difference");

/**
 * Current:
 * Expects a query to determine what should be sent
 * Passing an empty query returns everything.
 * Future:
 * The special query showRecmmended will only show
 * the blocks that were configured and set to recommended.
 * If popularOptions has not been configured, send an error
 * that the configuration was not made (404)
 */
router.get("/view", async function(req, res) {
    // Make sure that date is correct
    let dateFormat = new RegExp(process.env.DATE_FORMAT);
    if (!dateFormat.test(req.query.date)) {
        res.status(400);
        return res.end();
    }
    // Create a set with all open indexes in the day
    let openBlocks = await siteOps.findOne({ key: 2 });
    let openBlocksSet = new Set();
    for (let block of openBlocks.valueArray) {
        openBlocksSet.add(block);
    }
    // Get all reservations for that day and machine
    let allRes = await reservations.find({date: req.query.date, machine: req.query.machine});
    // Remove all reservatons from the open blocks
    for (let activeRes of allRes) {
        for (let block of activeRes.get('blocks')) {
            openBlocksSet.delete(block);
        }
    }
    // Format the open blocks array
    let milsPerBlock = (await siteOps.findOne({ key: 0 })).valueNumber
    let returnBlocks = [];
    for (let block of openBlocksSet) {
        returnBlocks.push({
            index: block,
            start: milsPastMidnightToUnixTime(await indexToMilsAfterMidnight(block), req.query.date),
            end: milsPastMidnightToUnixTime(await indexToMilsAfterMidnight(block) + milsPerBlock, req.query.date)
        })
    }
    // Return the open blocks array
    res.status(200);
    res.send(returnBlocks);
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
        console.log("i=" + i)
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