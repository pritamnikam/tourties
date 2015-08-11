// Load required packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

// Connect to the tortoise MongoDB
mongoose.connect('mongodb://localhost:27017/tortoisedb');

// Create application instance
var app = express();

// Use the passport package in our application
app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));


// Configure the routing table.
require('./utils/configure').configure(app);

module.exports = app;
