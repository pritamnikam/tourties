// Load required packages
var mongoose = require('mongoose');

// Defind the schema for user profile
var profile_schema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	screen_name: String,
	email: String,
	phone: String,
	user_id: String,	
});

// Export the user profile data model
module.exports = mongoose.model('Profile', profile_schema);