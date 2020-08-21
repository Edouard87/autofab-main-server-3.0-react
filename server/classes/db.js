const mongoose = require("mongoose");
require('dotenv').config();


db = {
    connect: function() {
        mongoose.connect(process.env.MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on("error", err => {
            console.log(err);
        });
    }
}

module.exports = db;