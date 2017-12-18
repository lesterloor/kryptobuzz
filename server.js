var express  = require('express');
var app      = express();
var port     = process.env.PORT || 1887;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var pug    = require('pug');
var fs    = require('fs');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var multer = require('multer')
var path = require('path')

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug'); // set up ejs for templating
app.set(express.static('./public'));
app.use(express.static(__dirname));

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen(port);
console.log('Working on port ', port);
