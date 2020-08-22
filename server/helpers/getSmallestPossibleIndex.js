/**
 * Gets the smallest possible index given a time value (which must be
 * a moment object).
 */

const siteOps = require("../models/siteoption");

async function getSmallestPossibleIndex(time) {
    // Convert time to milliseconds after midnight
    let hours = time.hours();
    let minutes = time.minutes();
    const MILLISECONDS_PER_HOUR = 3600000;
    const MILLISECONDS_PER_MINUTE = 60000;
    let millisecondsAfterMidnight = (hours * MILLISECONDS_PER_HOUR) + (minutes * MILLISECONDS_PER_MINUTE);
    // Divide that by the milliseconds per block
    let milsPerBlock = (await siteOps.findOne({key: 0}).lean()).valueNumber;
    // Ceilling to make sure that the block words
    let index = Math.ceil(millisecondsAfterMidnight / milsPerBlock);
    /**
     * If it is 11:30, reserving block 11 is no longer
     * possible. You can only reserve block 12.
     */
    return index;
}

module.exports = getSmallestPossibleIndex;