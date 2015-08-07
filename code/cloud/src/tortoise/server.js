// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// List of controllers
var userController = require('./controllers/user');
var profileController = require('./controllers/profile');
var dashboardController = require('./controllers/dashboard');
var healthListingController = require('./controllers/health_listing');

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

// Create endpoint /tortoise/dashboard for POST
router.route('/dashboard')
	.post(dashboardController.postDashboard);

// Create endpoint /tortoise/dashboard/all for GET
router.route('/dashboard/all')
	.get(dashboardController.getDashboards);

// Create endpoint /tortoise/dashboard/:service_id for GET
router.route('/dashboard/:service_id')
	.get(dashboardController.getDashboard);


// ---------------------------------------------------------------//

// Create endpoint /tortoise/services/healthlistings/hospitals for POST & GET.
router.route('/services/healthlistings/hospitals')
	.post(healthListingController.postHospitalsListing)
	.get(healthListingController.getHospitalsListing);

// Create endpoint /tortoise/services/healthlistings/physicians for POST & GET.
router.route('/services/healthlistings/physicians')
	.post(healthListingController.postPhysiciansListing)
	.get(healthListingController.getPhysiciansListing);

// Create endpoint /tortoise/services/healthlistings/pharmacies for POST & GET.
router.route('/services/healthlistings/pharmacies')
	.post(healthListingController.postPharmaciesListing)
	.get(healthListingController.getPharmaciesListing);

// Create endpoint /tortoise/services/healthlistings/hospitals/:listing_id for POST & GET.
router.route('/services/healthlistings/hospitals/:listing_id')
	.get(healthListingController.getHospitalListing);

// Create endpoint /tortoise/services/healthlistings/physicians/:listing_id for POST & GET.
router.route('/services/healthlistings/physicians/:listing_id')
	.get(healthListingController.getPhysicianListing);

// Create endpoint /tortoise/services/healthlistings/pharmacies/:listing_id for POST & GET.
router.route('/services/healthlistings/pharmacies/:listing_id')
	.get(healthListingController.getPharmacyListing);

// ---------------------------------------------------------------//

// Create endpoint /tortoise/services/healthlistings/reviews/hospitals/:listing_id for POST & GET.
router.route('/services/healthlistings/reviews/hospitals/:listing_id')
	.post(healthListingController.postHospitalReview)
	.get(healthListingController.getHospitalReview);

// Create endpoint /tortoise/services/healthlistings/physicians/:listing_id for POST & GET.
router.route('/services/healthlistings/physicians/:listing_id')
	.post(healthListingController.postPhysicianReview)
	.get(healthListingController.getPhysicianReview);

// Create endpoint /tortoise/services/healthlistings/pharmacies/:listing_id for POST & GET.
router.route('/services/healthlistings/pharmacies/:listing_id')
	.post(healthListingController.postPharmacyReview)
	.get(healthListingController.getPharmacyReview);

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