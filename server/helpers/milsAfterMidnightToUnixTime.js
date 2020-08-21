const moment = require("moment");
const milsToTime = require("./milsToTime");

function milsPastMidnightToUnixTime(milsAfterMidnight, date) {
  let time = milsToTime(milsAfterMidnight)
  let unixTime = moment(time + " " + date, "H:m:s MM-DD-YYYY")
  return unixTime.valueOf()
}
module.exports = milsPastMidnightToUnixTime;