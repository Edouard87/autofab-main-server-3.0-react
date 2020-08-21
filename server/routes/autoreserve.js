const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const autoreserve = require('../classes/autoreserve');

router.post("/new", async (req, res) => {
    autoreserve.new(req.decoded.user._id, req.body.date, req.body.machine, req.body.blocks, req.body.description).then(result => {
        res.status(200);
        res.end();
    }).catch(err => {
        console.log(err);
        if (err.name == "CastError" || err instanceof mongoose.Error.ValidationError) {
            res.status(400);
            res.end();
        }
        console.log(err)
        res.status(500);
        res.end();
    });
});
/**
 * Shows the user all of their reservations. It does not allow the user to view reservations that
 * are not theirs (something that an admin may want to do). The query for this route is passed into
 * the mongoose query to search and find the given reservation.
 */
router.get("/view", autoreserve.view.user);
/**
 * Shows an admin user all reservations so that they may be manipulated. Not meant for students.
 */
router.get("/view/all", autoreserve.view.all);

/**
 * Gets the next reservation that is to take place for that
 * specific user.
 */
router.get("/view/next", autoreserve.next);

/**
 * Uses the status codes to set the reservaton as started. This action can
 * only be completed if the reservation's current status is set to started. If
 * the reservation's current status is other than 0, it will refuse to start. Note that
 * a user may only set the upcoming reservation as started if they are between the start
 * and end times. The conditions are below.
 * A user may only start a reservation if:
 * a) They are within a certain constant since the start
 * b) After the start
 * c) The reservation has a status of 0
 */
router.post("/res/set/started", async (req, res) => {
    autoreserve.setStarted(req.decoded.user._id);
});

module.exports = router;