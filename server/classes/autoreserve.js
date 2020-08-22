const reservations = require("../models/reservation2");
const mongoose = require("mongoose");
const siteOps = require("../models/siteoption");
let subSet = require("../helpers/sets/subSet");
Set.prototype.subSet = subSet;
const machines = require("../models/machines");
const machineTypes = require("../models/machineTypes");
const moment = require("moment");
const agenda = require("../agenda");

const autoreserve = {
    test: async function(data) {
        let now = moment().valueOf();
        return now;
    },
    /**
     * Creates a new reservation. 
     * @param {string} user - The ID of the user making the reservation
     * @param {string} date - The date of the reservation. Format is MM/DD/YYYY
     * @param {string} machine - The ID of the machine on which the reservation is made
     * @param {array} blocks - The blocks requested by the user
     * @param {string} description - The reason for the reservation
     * returns 200 if fulfilled and okay and will reject with error if there is an error. 
     * 
     * Reservations cannot be made for dates that are in the past
     */
    new: async function(user, date, machine, blocks, description) {
        // The new block checking method –– find all reservations for that day
        // Note that the date should have dashes. Make sure it does

        // Verify that there are no conflicts

        // Make sure that the reservaton is after the current time

        // Make sure that all indexes are greater than this block

        // Find all reservations
        let allRes = await reservations.find({ date: date, machine: machine });

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
        for (let index of blocks) {
            if (allIndexes.has(index)) {
                throw new mongoose.Error.ValidationError()
            }
            bodyBlocks.add(index);
        }
        // The reservation does not seem to conflict
        // Check if the reservation conflcits with open/close times
        // Get the open blocks
        let openBlocks = await siteOps.findOne({ key: 2 });
        // Construct a set
        let openBlocksSet = new Set();
        // Add each index to the set
        for (let block of openBlocks.valueArray) {
            openBlocksSet.add(block);
        }
        // Are the openblocks a subset of the indexes
        // in the reservation?
        if (!bodyBlocks.subSet(openBlocksSet)) {
            throw new mongoose.Error.ValidationError()
        } else {
            let newRes = await reservations.create({
                user: user,
                date: date,
                machine: machine,
                blocks: blocks,
                description: description
            });
            // Create a job for this reservation
            // This job will be used to update the reservation
            // status when it expires
            let resStartExpires = moment(newRes.get("start_expires"),"x").toDate();
            let resId = newRes.get("_id")
            await agenda.schedule(resStartExpires, "reservationStartExpires", { resId: resId });
            return 200;
        }
    },
    view: {
        user: async (req, res) => {
            // Make sure the username is the user that is currently logged in
            req.query.user = req.decoded.user._id
            // Get all reservations
            let allRes = await reservations.find(req.query);
            // Get the start and end time for each reservation
            // Return all reservations
            res.status(200);
            res.send(allRes);
        },
        all: (req, res) => {}
    },
    /**
    * Helper function to get the next upcoming reservaton. Returns nothing
    * if nothing is found.
    * @param {String} user - The ID of the user whose reservation must be foud.
    */
    getNextRes: async user => {
        /**
        * We want reservations that are either starting or already taking place. Any
        * other reservation is of little interest to us.
        */
        let allRes = await reservations.find({ user: user, status: { $in: [0, 1] } });
        // Figuring out which one comes first
        // Create an array with all start times (mergeSort)
        let times = [];
        for (reserved of allRes) {
            times.push(reserved.get('start'));
        }
        // Sort the array
        times.sort(function (a, b) {
            return a - b;
        })
        // The reservaton with that start time is the one that takes place next. Return that one.
        for (reserved of allRes) {
            if (reserved.get('start') == times[0]) {
                // The reservation has been found
                return reserved;
            }
        }
        return undefined;
    },
    next: async function(req, res) {
        let requestedRes = await autoreserve.getNextRes(req.decoded.user)
        if (!requestedRes) {
            res.status(400);
            return res.end();
        }
        requestedRes = requestedRes._doc
        // Now, get the machine
        let machine = await machines.findById(requestedRes.machine);
        requestedRes.machine = machine._doc;
        // Now, get the type of the machine
        let type = await machineTypes.findById(requestedRes.machine.type);
        requestedRes.machine.type = type;
        // Now return it
        res.status(200);
        return res.send(reserved._doc);
    },
    /**
     * Marks the next reservation as started. Returns 200 if all is
     * good. If not, throws an error.
     * @param {String} user - The ID of the user whose reservation is being marked
     */
    setStarted: async function (user) {
        // Get the next reservation
        let requestedRes = await autoreserve.getNextRes(user);
        // Make sure that there is a reservation to compare
        if (!requestedRes) {
            throw new mongoose.Error.ValidationError("No reservation found.")
        }
        // Note: All returned reservations have a status of 0
        // Make sure that the expiry date is greater than the current time
        let now = moment().valueOf();
        if (requestedRes.get("start_expires") >= now) {
            // start_expires is in the future. We're good
            requestedRes.set("status", 1);
            await requestedRes.save();
            return 200;
        } else {
            /**
             * Marks the reservaton as 
             */
        }
        // This should technically never happen, as the status of the reservation would
        // have been set to 0 anyway. Thus is to prevent an attacker from forcefully
        // changing a reservation to started.
        throw new mongoose.Error.ValidationError("Too late");
    }
}

module.exports = autoreserve;