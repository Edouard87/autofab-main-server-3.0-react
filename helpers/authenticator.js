/* This deals with authenticating the user's 
 * auth token.
 */

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
dotenv.config();

function authenticate(req, res, next) {
    const token = req.cookies.auth || '';
    try {
        if (!token) {
            return res.status(401).end();
        }
        const decrypt = jwt.verify(token, process.env.HMACKEY);
        req.decoded = decrypt; // Eveyrthing goes in req.decoded
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.toString());
    }
}

 module.exports = authenticate;