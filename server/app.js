var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
* Development  Settings
*/
if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, '../client')));

    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    //Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('err', {
            message: err.message,
            error: err
        });
    });
}

if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, '/dist')));
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
