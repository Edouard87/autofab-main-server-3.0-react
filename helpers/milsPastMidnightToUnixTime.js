const moment = require("moment");
const milsToTime = require("./milsToTime");

function milsPastMidnightToUnixTime(milsAfterMidnight, date) {
  return moment(milsToTime(milsAfterMidnight) + " " + date, "H:m:s MM-DD-YYYY").valueOf()
}
module.exports = milsPastMidnightToUnixTime;