const express = require("express");
const router = express.Router();
const reservations = require("../models/reservation");
const mongoose = require("mongoose")

router.post("/new", function(req, res) {
    console.log("reserving!")
    console.log("DECODED", req.decoded)
    req.body.user = req.decoded.user.email; // Remember that everything is in the user object nested in decoded
    console.log(req.body)
    reservations.create(req.body).then(doc => {
        res.status(200);
        res.end();
    }).catch(err => {
        if (err.name == "CastError") {
            res.status(400);
            console.log(err)
            return res.end();
        } else if (err instanceof mongoose.Error.ValidationError) {
            // This is a validation error
            // A validation error contains multiple validatorErrors
            res.status(400);
            return res.send(err)
        }
        console.log(err)
        res.status(500);
        res.end();
    })
});

module.exports = router;