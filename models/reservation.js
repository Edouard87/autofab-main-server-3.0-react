const mongoose = require("mongoose");
const moment = require("moment");
const machines = require('../models/machines');
const blocks = require("../models/block");
const ops = require("../models/siteoption");
const users = require("../models/user");

const generateTimeBlocks = require("../helpers/generateTimeBlocks")
const milsPastMidnightToUnixTime = require("../helpers/milsPastMidnightToUnixTime")

const resSchema = mongoose.Schema({
    machine: String,
    machineType: String,
    blocks: {type: [Number], required: true},
    date: {type: String, required: true}, // To figure out which set of blocks is being requested. The date is string as we are using a custom date
    start: {type: Number}, // These are genereated by the server
    end: {type: Number},
    status: {type: Number, required: true},
    user: {type: String, required: true} // ID of the user
})

resSchema.pre('save', async function(next) {
    // We also make sure that the date string is of the correct format
    if (!moment(this.date, "MM-DD-YYYY").isValid()) {
      return next(new Error("Invalid date format")) // This triggers a 400 error code
    }
    // We make sure that either a machine or a type were supplied
    if (!(this.machine || this.machineType)) {
        return next(new Error("Either a machine or a machine type should be supplied"));
    }
    // First, we make sure that the machine exists  (if a machine was supplied)
    if (this.machine) {
      let machine;
      try {
        machine = await machines.findById(this.machine)
      } catch (err) {
        if (err.name == "CastError") {
          return next(new Error("The machine is not a correct ID")); // The machine path is incorrect
        }
        console.log(err)
        return next(new Error(500)) // A server error occured
      }
      if (!machines) {
        return next(new Error("The supplied machine ID does not exist")); // The ID is not that of a machine
      }
    }
    if (this.machineType) {
        // Else, we find a machine for that type that is available
        // First, we find all machines for that type
        let machines = await machines.find({
          type: this.machineType
        });
        for (var i = 0; i < matchingMachine.length; i++) {
          let matchingBlocks = await blocks.find({
            machine: matchingMachine[i],
            date: this.date
          })
          if (matchingBlocks.length == 0) {
            // The blocks have not yet been generated for this machine at this time. It is available
            this.machine = matchingMachine[i]
            break;
          } else {
            // some of them may be unavailable
            let availableBolocks = matchingBlocks.find(x => x.available == true);
            if (availableBolocks.length == 0) {
              // This machine is not available at this time
            } else {
              // This machine is available
              this.machine = matchingMachine[i]
              break;
            }
          }
        }
    }
    let timeBlocks = await blocks.find()
    // We also make sure that the user exists
    let currentUser = await users.findOne({email: this.user}); // We don't have the ID yet
    if (!currentUser) {
        // If there is no user
        return next(new mongoose.Error.ValidationError);
    } else {
        this.user = currentUser._id;
    }
    // We also want to sort the array
    this.blocks.sort(function(a, b) {
        return a - b
    })
    // Then, we make sure that all blocks are sequential
    let previousBlock = this.blocks[0];
    for (var i = 1; i < this.blocks.length; i++) {
        let currentBlock = this.blocks[i];
        if (previousBlock != currentBlock - 1) {
          return next(new Error("Time blocks must be sequential"))
        }
        previousBlock = currentBlock;
    }
    // Before doing anything, check to make sure that blocks have been generated for that day
    let dayBlocks
    try {
        dayBlocks = await blocks.find({date: this.date, machine: this.machine});
    } catch(err) {
        throw err
    }
    if (dayBlocks.length == 0) {
        
        timeBlocks = await generateTimeBlocks(blocks, ops, this.date, this.machine)
        
        await blocks.insertMany(timeBlocks);
    }
    
    // We also want to make sure that the requested blocks are available
    let availableBlocks;
    try {
        availableBlocks = await blocks.find({available: true, date: this.date, machine: this.machine})
    } catch(err) {
        return next(new Error("Requested times are not available"));
    }
    // We want an array of indexes
    let availableIndexes = new Array();
    for (var i = 0; i < availableBlocks.length; i++) { 
        availableIndexes.push(availableBlocks[i].index);
    } 
    
    for (var i = 0; i < this.blocks.length; i++) {
        if (!availableIndexes.includes(this.blocks[i])) {
            
            return next(new mongoose.Error.ValidationError({errors: [new mongoose.Error.ValidatorError({
              kind: "conflict",
              path: "blocks",
              value: this.blocks
            })]}));
        }
    }
    // We want to generate the start and end times
    let largestAndSmallest;
    try {
        largestAndSmallest = await blocks.find({
        index: {$in: [this.blocks[0],this.blocks[this.blocks.length-1]]}
        })
    } catch(err) {
        next(new Error());
    }
    let startMilsAfterMidnight = largestAndSmallest[0].startMilsPastMidnight;
    let endMilsAfterMidnight = largestAndSmallest[1].endMilsPastMidnight;
    this.start = milsPastMidnightToUnixTime(startMilsAfterMidnight, this.date) // Converts the relative mils after midnight to a UNIX timestamp
    this.end = milsPastMidnightToUnixTime(endMilsAfterMidnight, this.date)
    
    // Only then can we go forth with the reservation
    next();
});

resSchema.post('save', function(doc) {
    let operations = new Array();
    // Update the blocks model
    blocks.find({
      index: {
        $in: doc.blocks
      }
    }).then(takenBlocks => {
        takenBlocks.forEach(function (oneBlock) {
          oneBlock.available = false;
          operations.push(oneBlock.save())
        })
        Promise.all(operations).catch(err => {
          throw err
        })
    }).catch(err => {
        throw err
    })
})

const resModel = mongoose.model("reservation",resSchema);

module.exports = resModel;