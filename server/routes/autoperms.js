/* This handles permission creation and viewing. All start with
 * /perms
 */

const express = require("express");
const router = express.Router();
const perms = require("../models/permission")

router.get("/all", function(req, res) {
    perms.find().then(docs => {
        res.status(200);
        res.send(docs);
    }).catch(err => {
        res.status(500);
        res.send(err);
    })
});

router.post("/new", function(req, res) {
    perms.create(req.body).then(doc => {
        res.status(200);
        res.send(doc);
    }).catch(err => {
        res.status(500);
        res.send(err);
    })
});

module.exports = router;