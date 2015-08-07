// Load required packages
var mongoose = require('mongoose');

// Defind the schema for health listings review
var review_schema = new mongoose.Schema({
	listing_type: String,
	listing_id: String,
	user_id: String,
	user_name: String,
	text: String,
	rating: {
		scale: Number,
		user_rate: Number
	}
});

// Export the health listings review data model
module.exports = mongoose.model('Review', review_schema);