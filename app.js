const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes/index');

const app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB setup

const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/autofab3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
    console.log(err);
})

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

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* Set the directory to the build
 */
app.use(express.static(path.join(__dirname, '/client/build')))

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

app.listen(5000, function () {
  console.log('Express server listening on port 5000');
})

