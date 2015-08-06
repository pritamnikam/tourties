// Load required packages
var mongoose = require('mongoose');

// Defind the schema for user service profile
var service_schema = new mongoose.Schema({
	service_name: String,
	service_type: String,
	attribute: String,
	service_id: String,
	user_id: String
});

// Export the service data model
module.exports = mongoose.model('Service', service_schema);