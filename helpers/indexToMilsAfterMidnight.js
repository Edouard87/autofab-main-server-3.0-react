const siteOps = require("../models/siteoption");
indexToMilsAfterMidight = async index => {
    let milsPerBlock = await siteOps.findOne({key: 0});
    let returnData = index * milsPerBlock.valueNumber;
    return returnData;
}

module.exports = indexToMilsAfterMidight;