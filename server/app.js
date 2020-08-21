const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require("./classes/db");
const app = express();
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Agenda setup

const agenda = require("./agenda");
/**
 * An IIFE  must be used to give access to async/await
 */
(async function() {
    await agenda.start();
});

/**
 * Debugging
 */

agenda.on('start', job => {
    console.log('Job %s starting', job.attrs.name);
})

// MongoDB setup

db.connect();

// auth setup

const authenticator = require("./helpers/authenticator")

/* * * Routes setup * */
// No Auth Routes
app.use('/auth', require("./routes/autoauth")); // Authentication route cannot be locked!
// Auth Routes
app.use('/users', authenticator, require('./routes/user'));
app.use('/perms', authenticator, require("./routes/autoperms"));
app.use('/assistant', authenticator, require("./routes/assistant"));
app.use('/blocks', authenticator, require("./routes/autotime"));
app.use('/hardware', authenticator, require("./routes/autohardware"));
app.use("/res", authenticator, require("./routes/autoreserve"));
// Serve the React client
/**
 * React must be compiled into a build to be pushed to Heroku. The
 * users never see the actual app –– they only see the the
 * compiled app, which looks nothing like the
 * original code (Babel transpiles ES6 JS to ES5 for better
 * portability).
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.end();
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.end();
});

module.exports = app;
