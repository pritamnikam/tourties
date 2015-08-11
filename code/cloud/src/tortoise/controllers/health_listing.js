// Load required packages and data models
var express = require('express');
var router = express.Router();
var HealthListing = require('../models/services/health_listing');
var Review = require('../models/services/review');

// ------------------------------------------------------------- //

// Helper function to add health listings.
function addHealthListingUtil(req, res, listing) {
  var health_listing = new HealthListing({
	  listing_type: listing, 
	  listing_name: req.body.listing_name,
	  location: req.body.location,
	  address: req.body.address,
	  description: req.body.description,
	  image: req.body.image,
	  user_rating: {
		  total_reviews: 0,
		  rating_scale: 5,
		  rating: 0
	  }
  });
  
  health_listing.save(function(err) {
    if (err)
      res.send(err);
      
      res.json(health_listing);
  });
}

// Create endpoint /tortoise/services/healthlistings/hospitals for POST
var postHospitalsListing = function(req, res) {
  addHealthListingUtil(req, res, 'hospital');
};

// Create endpoint /tortoise/services/healthlistings/physicians for POST
var postPhysiciansListing = function(req, res) {
  addHealthListingUtil(req, res, 'physician');
};

// Create endpoint /tortoise/services/healthlistings/pharmacies for POST
var postPharmaciesListing = function(req, res) {
  addHealthListingUtil(req, res, 'pharmacy');
};


// ------------------------------------------------------------- //

// Utility to get the health |listing|.
function getListingsUtil(req, res, listing) {
  HealthListing.find({listing_type: listing}, function(err, health_listing) {
    if (err)
      res.send(err);

    res.json(health_listing);
  });
}

// Create endpoint /tortoise/services/healthlistings/hospitals for GET
var getHospitalsListing = function(req, res) {
  getListingsUtil(req, res, 'hospital');
};

// Create endpoint /tortoise/services/healthlistings/pharmacies for GET
var getPharmaciesListing = function(req, res) {
  getListingsUtil(req, res, 'pharmacy');
};

// Create endpoint /tortoise/services/healthlistings/physicians for GET
var getPhysiciansListing = function(req, res) {
  getListingsUtil(req, res, 'physician');
};

// Create endpoint /tortoise/services/healthlistings for GET
var getHealthListing = function(req, res) {
  res.json({message: 'List all health listings.'});
}

// ------------------------------------------------------------- //

// Utility to get the health |listing| for supplied lisitng_id in REST query.
function getListingUtil(req, res, listing) {
  HealthListing.find({lisitng_id: req.params.lisitng_id, listing_type: listing}, function(err, health_listing) {
    if (err)
      res.send(err);

    res.json(health_listing);
  });
}

// Create endpoint /tortoise/services/healthlistings/hospitals/:lisitng_id for GET
var getHospitalListing = function(req, res) {
  getListingUtil(req, res, 'hospital');
};

// Create endpoint /tortoise/services/healthlistings/pharmacies/:lisitng_id for GET
var getPharmacyListing = function(req, res) {
  getListingUtil(req, res, 'pharmacy');
};

// Create endpoint /tortoise/services/healthlistings/physicians/:lisitng_id for GET
var getPhysicianListing = function(req, res) {
  getListingUtil(req, res, 'physician');
};

// ------------------------------------------------------------- //

// Utility to add health listing user review
function addReviewUtil(req, res, listing_type) {
  var review = new Review({
  	listing_type: listing_type,
  	listing_id: req.params.listing_id,
  	user_id: req.body.user_id,
  	user_name: req.body.user_name,
  	text: req.body.text,
  	rating: {
  		scale: 5,
  		user_rate: req.body.user_rate
  	}
  });

  review.save(function(err) {
    if (err)
      res.send(err);
      
      res.json(review);
  });
}

// Create endpoint /tortoise/services/healthlistings/reviews/hospitals/:listing_id for POST
var postHospitalReview = function(req, res) {
  addReviewUtil(req, res, 'hospital');
};

// Create endpoint /tortoise/services/healthlistings/reviews/pharmacies/:listing_id for POST
var postPharmacyReview = function(req, res) {
  addReviewUtil(req, res, 'pharmacy');
};

// Create endpoint /tortoise/services/healthlistings/reviews/physicians/:listing_id for POST
var postPhysicianReview = function(req, res) {
  addReviewUtil(req, res, 'physician');
};

// ------------------------------------------------------------- //

// Utility to get the health |listing| review for supplied lisitng_id in REST query.
function getReviewUtil(req, res, listing) {
  Review.find({lisitng_id: req.params.lisitng_id, listing_type: listing}, function(err, review) {
    if (err)
      res.send(err);

    res.json(review);
  });
}

// Create endpoint /tortoise/services/healthlistings/reviews/hospitals/:listing_id for GET
var getHospitalReview = function(req, res) {
  getReviewUtil(req, res, 'hospital');
};

// Create endpoint /tortoise/services/healthlistings/reviews/pharmacies/:lisitng_id for GET
var getPharmacyReview = function(req, res) {
  getReviewUtil(req, res, 'pharmacy');
};

// Create endpoint /tortoise/services/healthlistings/reviews/physicians/:lisitng_id for GET
var getPhysicianReview = function(req, res) {
  getReviewUtil(req, res, 'physician');
};


// ---------------------------------------------------------------//
// Create endpoint /tortoise/services/healthlistings for GET
router.route('/')
    .get(getHealthListing);

// Create endpoint /tortoise/services/healthlistings/hospitals for POST & GET.
router.route('/hospitals')
	.post(postHospitalsListing)
	.get(getHospitalsListing);

// Create endpoint /tortoise/services/healthlistings/physicians for POST & GET.
router.route('/physicians')
	.post(postPhysiciansListing)
	.get(getPhysiciansListing);

// Create endpoint /tortoise/services/healthlistings/pharmacies for POST & GET.
router.route('/pharmacies')
	.post(postPharmaciesListing)
	.get(getPharmaciesListing);

// Create endpoint /tortoise/services/healthlistings/hospitals/:listing_id for POST & GET.
router.route('/hospitals/:listing_id')
	.get(getHospitalListing);

// Create endpoint /tortoise/services/healthlistings/physicians/:listing_id for POST & GET.
router.route('/physicians/:listing_id')
	.get(getPhysicianListing);

// Create endpoint /tortoise/services/healthlistings/pharmacies/:listing_id for POST & GET.
router.route('/pharmacies/:listing_id')
	.get(getPharmacyListing);

// ---------------------------------------------------------------//

// Create endpoint /tortoise/services/healthlistings/reviews/hospitals/:listing_id for POST & GET.
router.route('/reviews/hospitals/:listing_id')
	.post(postHospitalReview)
	.get(getHospitalReview);

// Create endpoint /tortoise/services/healthlistings/reviews/physicians/:listing_id for POST & GET.
router.route('/reviews/physicians/:listing_id')
	.post(postPhysicianReview)
	.get(getPhysicianReview);

// Create endpoint /tortoise/services/healthlistings/reviews/pharmacies/:listing_id for POST & GET.
router.route('/reviews/pharmacies/:listing_id')
	.post(postPharmacyReview)
	.get(getPharmacyReview);

// ---------------------------------------------------------------//

module.exports = router;
