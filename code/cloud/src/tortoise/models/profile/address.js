// Load required packages
var mongoose = require('mongoose');

// Defind the schema for user profile
var address_schema = new mongoose.Schema({
	  line1: String,
	  line2: String,
	  city: String,
	  state: String,
	  zip: Number,
	  country: String,
	  user_id: String
});

// Export the user data model
module.exports = mongoose.model('Address', address_schema);