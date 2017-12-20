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
var configDB = require('./config/database.js');
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './private/uploads')
	},
	filename: function(req, file, callback) {
    var fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
		callback(null, fileName )
	}
})
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug'); // set up ejs for templating
app.set(express.static('./public'));
app.use(express.static(__dirname));
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen(port);
console.log('Working on port ', port);
