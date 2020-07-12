const { model } = require("../models/user");

function blocksPerDay(t) {
    // t should be in milliseconds
    const MILLISECONDS_PER_DAY = 86400000;
    console.log(t)
    if (MILLISECONDS_PER_DAY % t == 0) {
        return MILLISECONDS_PER_DAY/t;
    } else {
        // It is not divisble in a day. For now, that is not supported.
        return -1;
    }
     
}

module.exports = blocksPerDay;