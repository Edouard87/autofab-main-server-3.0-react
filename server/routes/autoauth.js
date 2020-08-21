/* The autoauth file deals with
 * - Ceating a web token
 * - Deleting a web token
 */ 
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const users = require("../models/user");
const bodyParser = require("body-parser")
require('dotenv').config();

router.use(bodyParser.json());

router.post("/logout", function(req, res) {
    try {
        res.clearCookie(process.env.AUTH_COOKIE_NAME);
        res.status(200);
        res.end();
    } catch(err) {
        console.log(err)
        res.status(500);
        res.send(err)
    }
});

router.post("/login", function(req, res) {
    var passHash = new String();
    var hmac = crypto.createHmac("sha256", process.env.HMACKEY);
    try {
        passHash = hmac.update(req.body.password).digest("hex");
    } catch(err) {
        res.status(401);
        console.log(err);
        return res.end();
    }
    users.findOne({
          password: passHash,
          email: req.body.email
        }).then(user => {
       console.log(user);
        user.password = undefined;
        const token = jwt.sign({user}, process.env.HMACKEY);
        // Create auth cookie
        res.cookie(process.env.AUTH_COOKIE_NAME, token, {
          secure: false, // set to true if your using https
          httpOnly: true, // Should be set to true for security reasons
        });
        res.status(200);
        res.end()
    }).catch(err => {
        res.status(401); // Username or password is incorrect
        console.log(err);
        res.end();
    })
});



module.exports = router;