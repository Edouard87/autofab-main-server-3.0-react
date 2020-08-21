const express = require('express');
const router = express.Router();
const users = require("../models/user")
const crypto = require("crypto");
const hmac = crypto.createHmac("sha256", process.env.HMACKEY);

router.get("/all", function(req, res) {
  users.find({}).then(docs => {
    res.status(200)
    res.send(docs)
  }).catch(err => {
    res.status(500);
    res.send(err)
  })
})

router.post("/new", function (req, res) {
  // hash password
  req.body.password = hmac.update(req.body.password).digest("hex");
  // create user
  users.create(req.body).then(doc => {
    res.status(200);
    doc.password = undefined;
    res.send(doc);
  }).catch(err => {
    res.status(500)
    res.send(err)
  })
});
module.exports = router;
