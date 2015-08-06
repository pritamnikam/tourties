// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');


var userController = require('./controllers/user');
var profileController = require('./controllers/profile');


// Connect to the tortoise MongoDB
mongoose.connect('mongodb://localhost:27017/tortoisedb');

// Create application instance
var app = express();

// Set the port number
var port = process.env.PORT || 3000;

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// ---------------------------------------------------------------//

// Create endpoint /tortoise/auth/session for POST
router.route('/auth/session')
	.post(userController.postUsers);

// Create endpoint handlers for /tortoise/users
router.route('/users')
	.get(userController.getUsers);

// Create endpoint /tortoise/users/:user_id for GET
router.route('/users/:user_id')
	.get(userController.getUser);

// ---------------------------------------------------------------//

// Create endpoint /tortoise/user/profile for POST
router.route('/user/profile')
	.post(profileController.postProfile);

// Create endpoint /tortoise/user/profile/:user_id for GET
router.route('/user/profile/:user_id')
	.get(profileController.getProfile);

// Create endpoint /tortoise/user/address for POST
router.route('/user/address')
	.post(profileController.postAddress);

// Create endpoint /tortoise/user/address/:user_id for GET
router.route('/user/address/:user_id')
	.get(profileController.getAddress);

// Create endpoint /tortoise/user/service for POST
router.route('/user/service')
	.post(profileController.postService);

// Create endpoint /tortoise/user/service/:user_id for GET
router.route('/user/service/:user_id')
	.get(profileController.getService);

// Create endpoint /tortoise/user/medical_history for POST
router.route('/user/medical_history')
	.post(profileController.postMedicalHistory);

// Create endpoint /tortoise/user/medical_history/:user_id for GET
router.route('/user/medical_history/:user_id')
	.get(profileController.getMedicalHistory);

// ---------------------------------------------------------------//

// Initialize the dummy route for testing
// http://localhost:3000/tortoise
router.get('/', function(req, res, next) { 
	res.json({message: 'Hello, World!'});
});

// Register the route '/tortoise'
app.use('/tortoise', router);

// Listen on |3000|
app.listen(port);
console.log("Start listeing on http://localhost:"+port);