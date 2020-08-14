const express = require("express");
const router = express.Router();

const blocks = require("../models/block");
const siteOps = require("../models/siteoption");
const milsPastMidnightToUnixTime = require("../helpers/milsPastMidnightToUnixTime");
const moment = require("moment")

router.get("/view", async function(req, res) {
    console.log("request is: ", req.query)
    // Expects a query to determine what should be sent
    // Passing an empty query returns everything
    // The special query showRecmmended will only show
    // the blocks that were configured and set to recommended.
    // If popularOptions has not been configured, send an error
    // that the configuration was not made (404)
    let searchQuery = new Object();
    if (req.query.showRecommended) {
        // Find popular options
        let popularOptions = await siteOps.findOne({key: 3})
        if (popularOptions.valueArray.length == 0) {
            res.status(404); // No popular options have been configured
            return res.end();
        }
       searchQuery = {
           index: {
             $in: popularOptions.valueArray
           }
        }
    } else {
        // show what the user wants to see
        searchQuery = req.query
    }
    blocks.find(searchQuery).then(foundBlocks => {
        // We found everything
        let betterBlocks = new Array();
        foundBlocks.map(oneBlock => {
            betterBlocks.push({
                ...oneBlock._doc,
                start: milsPastMidnightToUnixTime(oneBlock.startMilsPastMidnight),
                end: milsPastMidnightToUnixTime(oneBlock.endMilsPastMidnight)
            })
        })
        res.status(200)
        res.send(betterBlocks)
    }).catch(err => {
        // The server encountered an exception
        res.status(500)
        res.send(err)
    })
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
            let day = moment().add(i, 'd').format('MM/DD/yyy');
            dateSelector.push(day);
        }
        dayIndex++;
    }
    res.send(dateSelector);
})

module.exports = router;