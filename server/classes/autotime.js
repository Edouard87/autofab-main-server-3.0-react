const siteOps = require("../models/siteoption");
const milsPastMidnightToUnixTime = require("../helpers/milsAfterMidnightToUnixTime");
const indexToMilsAfterMidnight = require("../helpers/indexToMilsAfterMidnight");
const moment = require("moment")
const reservations = require("../models/reservation2");
Set.prototype.difference = require("../helpers/sets/difference");

const getSmallestPossibleIndex = require("../helpers/getSmallestPossibleIndex");

const autotime = {
    /**
     * Sends the available time
     * blocks for a particular machine
     * on a particular date.
     * @param {String} date - The date of the reservation in MM-DD-YYYY
     * @param {String} machine - The ID of the machine for which the blocks are being looked up
     */
    viewAll: async (date, machine) => {
        // Make sure that date is correct
        let dateFormat = new RegExp(process.env.DATE_FORMAT);
        if (!dateFormat.test(date)) {
            throw Error("Incorrect date format");
        }
        // Create a set with all open indexes in the day
        let openBlocks = await siteOps.findOne({ key: 2 });
        let openBlocksSet = new Set();
        for (let block of openBlocks.valueArray) {
            openBlocksSet.add(block);
        }
        // Get all reservations for that day and machine
        let allRes = await reservations.find({ date: date, machine: machine });
        // Remove all reservatons from the open blocks
        for (let activeRes of allRes) {
            for (let block of activeRes.get('blocks')) {
                openBlocksSet.delete(block);
            }
        }
        // Remove blocks that are in the past
        let now = moment();
        let smallestPossibleIndex = await getSmallestPossibleIndex(now);
        // while (block < open)
        for (block of openBlocksSet) {
            if (block < smallestPossibleIndex) {
                openBlocksSet.delete(block);
            } else {
                /**
                 * We iterate through a set
                 * in order of insertion. Because
                 * the blocks were inserted in order,
                 * we can assume that the remaining blocks
                 * will be larger and that we do not
                 * need to iteate through the rest.
                 */
                break;
            }
        }
        // Format the open blocks array
        let milsPerBlock = (await siteOps.findOne({ key: 0 })).valueNumber
        let returnBlocks = [];
        for (let block of openBlocksSet) {
            returnBlocks.push({
                index: block,
                start: milsPastMidnightToUnixTime(await indexToMilsAfterMidnight(block), date),
                end: milsPastMidnightToUnixTime(await indexToMilsAfterMidnight(block) + milsPerBlock, date)
            })
        }
        // Return the open blocks array
        return returnBlocks;
    }
}

module.exports = autotime;