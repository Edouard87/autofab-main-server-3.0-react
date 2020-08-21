const Agenda = require("agenda");
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname,".env")
});
const reservations = require("./models/reservation2");
const users = require("./models/user");
const agenda = new Agenda({ db: { address: process.env.MONGODBURI } });

/**
 * Updates a given reservation so that it is set to
 * started if it's startus is not yet started. This is meant
 * to be scheduled at the start_expires time of the reservation.
 */
agenda.define('reservationStartExpires', async job => {
    const { resId } = job.attrs.data;
    let reservation = await reservations.findById(resId);
    /**
     * If, by the time the reservation has come to its
     * start time expiration, it will marked with code
     * 6. Code 6 reservations will also  
     */
    if (reservation.get("status") == 0) {
        // Mark the reservation
        reservation.set("status", 6);
        // Give the user strikes
        let user = users.findById(reservation.get("user"));
        let strikes = user.get("strikes");
        user.set("strikes", strikes + reservation.get("blocks").length);
    }
    await reservation.save();
});

module.exports = agenda;