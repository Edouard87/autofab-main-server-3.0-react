const express = require("express");
const router = express.Router();
const reservations = require("../models/reservation2");
const mongoose = require("mongoose");
const siteOps = require("../models/siteoption");
let subSet = require("../helpers/sets/subSet");
Set.prototype.subSet = subSet;

router.post("/new", async function(req, res) {
    req.body.user = req.decoded.user.email; // Remember that everything is in the user object nested in decoded
    // The new block checking method –– find all reservations for that day
    // Note that the date should have dashes. Make sure it does
    
    // Verify that there are no conflicts

    // Find all reservations
    let allRes = await reservations.find({date: req.body.date});

    // Make an set of all indexes
    let allIndexes = new Set();
    // Make a set of the body indexes
    let bodyBlocks = new Set();

    // For each reservation
      // Add its indexes to a global set of indexes
        for (let oneRes of allRes) {
            // let block = new Set(res._doc.)
            for (let block of oneRes.get('blocks', Array)) {
                allIndexes.add(block)
            }
        }
        for (let index of req.body.blocks) {
            if(allIndexes.has(index)) {
                res.status(400);
                res.end();
            }
            bodyBlocks.add(index);
        }
    // The reservation does not seem to conflict

    // Check if the reservation conflcits with open/close times
    // Get the open blocks
    let openBlocks = await siteOps.findOne({key: 2});
    // Construct a set
    let openBlocksSet = new Set();
    // Add each index to the set
    for (let block of openBlocks.valueArray) {
        openBlocksSet.add(block);
    }
    // Are the openblocks a subset of the indexes
    // in the reservation?
    if (!bodyBlocks.subSet(openBlocksSet)) {
        res.status(400);
        return res.end();
    } else {
        reservations.create(req.body).then(doc => {
            res.status(200);
            res.end();
        }).catch(err => {
            if (err.name == "CastError") {
                res.status(400);
                console.log(err)
                return res.end();
            } else if (err instanceof mongoose.Error.ValidationError) {
                // This is a validation error
                // A validation error contains multiple validatorErrors
                res.status(400);
                return res.send(err)
            }
            console.log(err)
            res.status(500);
            res.end();
        })
    }
});

module.exports = router;