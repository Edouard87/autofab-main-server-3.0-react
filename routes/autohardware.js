const express = require("express");
const router = express.Router();

const machines = require("../models/machines");
const machineTypes = require("../models/machineTypes");

router.get("/types/view", async function(req, res) {
    let queryResult;
    try {
        queryResult = await machineTypes.find(req.query);
    } catch(err) {
        res.status(500)
        return res.send(err)
    }
    res.status(200);
    res.send(queryResult);
});

router.post("/types/new", function(req, res) {
    machineTypes.create(req.body).then(doc => {
        res.status(200);
        res.end()
    }).catch(err => {
        res.status(500);
        res.send(err);
    })
})

router.put("/types/edit", function (req, res) {
    machineTypes.updateOne({
      _id: req.body._id
    }, req.body).exec().then(result => {
     if (result.nModified == 0) {
         res.status(404) // No document was modified because no document was foud.
         return res.end();
     }
      res.status(200);
      res.end();
    }).catch(err => {
      res.status(500);
      res.end();
    })
})

router.delete("/types/delete", function (req, res) {
    machineTypes.findByIdAndRemove(req.body._id).then(oldDoc => {
        if (oldDoc == null) {
            res.status(404);
            return res.end();
        }
        res.status(200);
        res.end();
    }).catch(err => {
        res.status(500);
        res.send(err);
    })
})

// Machine creation and modification

router.get("/machines/view", async function(req, res) {
    queryResult = await machines.find(req.query);
    res.status(200);
    res.send(queryResult)
});

router.post("/machines/new", async function(req, res) {
    machines.create(req.body).then(doc => {
        res.status(200);
        res.end();
    }).catch(err => {
        console.log(err)
        res.status(500);
        res.end();
    })
});

router.put("/machines/edit", function(req, res) {
    machines.findByIdAndUpdate(req.body._id, req.body).then(doc => {
        console.log(doc);
        res.status(200);
        res.end();
    }).catch(err => {
        res.status(500);
        res.end();
    })
});

router.delete("/machines/delete", function(req, res) {
        machines.findByIdAndDelete(req.body._id).then(results => {
          if (results.nModified == 0) {
            res.status(404);
            return res.end();
          }
          res.status(200);
          res.end()
        }).catch(err => {
            if (err.name = "CastError") {
                res.status(400);
                return res.end();
            }
            res.status(500);
            res.end();
        })
});

module.exports = router;