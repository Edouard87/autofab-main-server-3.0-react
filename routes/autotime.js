const express = require("express");
const router = express.Router();

const blocks = require("../models/block");
const siteOps = require("../models/siteoption");
const milsPastMidnightToUnixTime = require("../helpers/milsPastMidnightToUnixTime");
const moment = require("moment")

router.get("/view", async function(req, res) {
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

module.exports = router;