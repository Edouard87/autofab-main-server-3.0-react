const moment = require("moment")

async function generateTimeBlocks(blocksModel, optionsModel, date, machineID) {
  let timeBlocks = new Array();
  // Eveyrthing must be emptied if this operation is repeared
  await optionsModel.findOne({key: 1}).then(async blocksInADay => {
    await optionsModel.findOne({
        key: 0
      }).then(async milsPerBlock => {
      await optionsModel.findOne({
          key: 2
        }).then(async openBlocks => {
        for (var i = 0; i < blocksInADay.valueNumber; i++) {
          
          let newBlock = {
            index: i,
            available: openBlocks.valueArray.includes(i),
            startMilsPastMidnight: i * milsPerBlock.valueNumber,
            endMilsPastMidnight: i * milsPerBlock.valueNumber + milsPerBlock.valueNumber,
            date: date, // Should be in the format MM-DD-YYYY
            machine: machineID
          }
          timeBlocks.push(newBlock);
        }
        
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }).catch(err => {
    throw err;
  })
  return timeBlocks; // Must be at the end because of asynchronous behaviour/
}

module.exports = generateTimeBlocks;