/* This is meant to run some basic 
 * tasks and is only meant to be
 * available to admins.
 */

const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const groups = require("../models/group");
const users = require("../models/user");
const perms = require("../models/permission");
const blocks = require("../models/block")
const mongoose = require("mongoose")
const machines = require("../models/machines");
const types = require("../models/machineTypes");

const blocksPerDay = require("../helpers/blocksPerDay");
const generateTimeBlocks = require("../helpers/generateTimeBlocks");

const crypto = require("crypto");
var hmac = crypto.createHmac("sha256", process.env.HMACKEY);

var siteOps = require("../models/siteoption");
const { isArray } = require("util");

router.get("/siteops/view/all", function(req, res) {
    siteOps.find({}).then(ops => {
        res.status(200)
        res.send(ops)
    }).catch(err => {
        res.status(500);
        res.send(ops)
    })
});

router.get("/siteops/view", function(req, res) {
    // ?id=ID_OF_OPTION
    let searchQuery;
    // 
    if (Boolean(req.query.id)) {
        // If the id is defined
        searchQuery = {
            _id: req.query.id
        }
    } else if (Boolean(req.query.key)) {
        searchQuery = {
          key: req.query.key
        }
    } else {
        res.status(400);
        return res.end();
    }
    siteOps.findOne(searchQuery).then(op => {
        res.status(200);
        res.send(op)
    }).then(err => {
        res.status(400);
        res.send(err)
    })
});

router.post("/siteops/set", async function(req, res) {
    var operations = new Array();
    siteOps.findOne(req.body._id ? {
        _id: req.body._id,
        userEdit: true
      } : {
        key: req.body.key,
        userEdit: true
      }).then(async op => {
        req.body._id = undefined;
        req.body.key = undefined; // Don't use req.body.key anymore use op.key or op.valueNumber or op.valueArray
        try {
            if (isArray(req.body.value)) {
              op.valueArray = req.body.value;
            } else {
              op.valueNumber = req.body.value;
            }
        } catch(err) {
            res.status(400);
            return res.send(err);
        }
        switch(op.key) {
            case 0:
                siteOps.findOne({
                  key: 0
                }).then(async milPerBlock => {
                  var numberOfBlocks = blocksPerDay(milPerBlock.valueNumber);
                  if (numberOfBlocks == -1) {
                    res.status(400)
                    return res.end()
                  }
                  siteOps.findOne({
                    key: 1
                  }).then(async function (numberOfBlocks) {
                    // Calculate the blocks in one day
                    blocksInADay.valueNumber = numberOfBlocks
                    // Save the modifications
                    operations.push(blocksInADay.save());
                    // Clear the blocks model
                    operations.push(blocks.deleteMany({}).exec())
                    // Clear the schedule
                    let labHours = await siteOps.find({
                      key: 2
                    });
                    labHours.valueArray = [];
                    await labHours.save();
                    // end the middleware
                  }).catch(err => {
                    res.status(400);
                    res.end();
                  })
                })
                // N.B. Configuring the schedule is done in the generateTimeBlocks helper function. 
            case 2:
              console.log("case 2!")
              // This is if the schedule has been modified
              // This is very important and cannot be removed
                let schedule = await blocks.find({});
                console.log(op.valueArray.includes(11))
                let operations = new Array();
                for (var i = 0; i < schedule.length; i++) {
                  if (op.valueArray.includes(schedule[i].index)) {
                    schedule[i].available = true
                    operations.push(blocks.findByIdAndUpdate(schedule[i]._id,{available: true}))
                  } else {
                     operations.push(blocks.findByIdAndUpdate(schedule[i]._id, {
                       available: false
                     }))
                  }
                  
                }
                await Promise.all(operations);
        }
        // Prepare to save 
        operations.push(op.save())
        // Change siteoption 2

        Promise.all(operations).then(docs => {
            res.status(200);
            res.end()
          }).catch(err => {
            
            res.status(500);
            res.send(err);
          });
    })
});

router.delete("/autotime/clear", function(req, res) {
  blocks.deleteMany({}).exec().then(delDoc => {
    res.status(200);
    res.end()
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.end();
  })
})

router.delete("/machines/clear", function (req, res) {
  machines.deleteMany({}).exec().then(delDoc => {
    res.status(200);
    res.end()
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.end();
  })
})

router.delete("/types/clear", function (req, res) {
  types.deleteMany({}).exec().then(delDoc => {
    res.status(200);
    res.end()
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.end();
  })
})

router.post("/siteops/new", function(req, res) {
    siteOps.create(req.body).then(doc => {
        res.status(200);
        res.send(doc)
    }).catch(err => {
        res.status(500);
        res.send(err)
    })
});

router.delete("/database/cleardatabase", function(req, res) {
    mongoose.connection.db.dropDatabase();
    res.send(200);
    res.end();
});

router.post("/database/setdefault", function(req, res) {
  hmac = crypto.createHmac("sha256", process.env.HMACKEY) // hash must be reinstated every time.
    const defaultSiteOptions = [{
      userEdit: true,
      displayName: "milsPerBlock",
      key: 0,
      valueNumber: 3600000
    }, {
      userEdit: false,
      displayName: "blocksInADay",
      key: 1,
      valueNumber: 24
    }, {
      userEdit: true,
      displayName: "openBlocks",
      key: 2,
      valueArray: []
    }, {
      userEdit: true,
      displayName: "popularBlocks",
      key: 3,
      valueArray: []
    }]

    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        if (names.length != 0) {
          // The database already has things inside of it
          res.status(400);
          return res.send("You may not populate a database that has not yet been cleared") // Don't forget to return!
        } else {
          groups.create({
            name: "Administrators",
            description: "FabLab administrators",
            display: 1
          }).then(admin => {
            perms.create({
              name: "admin",
              permittedActions: ["all"]
            }).then(perm => {
              users.create({
                email: "admin@autofab.com",
                name: "Admin",
                password: hmac.update("admin").digest("hex"),
                permission: perm._id,
                groups: [admin._id]
              }).then(doc => {
                siteOps.insertMany(defaultSiteOptions).then(async insertedOps => {
                  let machineType = await types.create({
                    name: "Laser Cutter"
                  })
                  let newMachine = await machines.create({
                    name: "Your First Machine",
                    type: machineType._id,
                    status: 0
                  })
                  res.status(200);
                  res.end();
                }).catch(err => {
                  res.status(500);
                  res.send(err)
                })
              }).catch(err => {
                res.status(500);
                res.send(err)
                console.log(err)
              })
            }).catch(err => {
              res.status(500);
              res.send(err);
              console.log(err)
            })
          }).catch(err => {
            res.status(500);
            res.send(err);
            console.log(err)
          })
        }
      }
    });

});

module.exports = router;