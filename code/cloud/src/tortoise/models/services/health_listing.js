// Load required packages.
var mongoose = require('mongoose');
var elmongo = require('elmongo');

// Defind the schema for health listings { hospital, physician, pharmacy }
var health_listing_schema = new mongoose.Schema({
	  listing_type: String, 
	  listing_name: String,
	  location: String,
	  address: String,
	  description: String,
	  image: String,
	  user_rating: {
		  total_reviews: Number,
		  rating_scale: Number,
		  rating: Number
	  }
});

// Add to elasticsearch db.
health_listing_schema.plugin(elmongo)

// Export the health listings data model.
module.exports = mongoose.model('HealthListing', health_listing_schema);