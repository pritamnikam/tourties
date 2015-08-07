// Load required packages
var mongoose = require('mongoose');

// Defind the schema for dashboard services
var service_schema = new mongoose.Schema({
	service_type: String,
	service_name: String,
	service_id: String,
	attribute: String,
	language: String,
	icon: String,
	label: String,
	pending_notices: Number
});

// Export the service data model
module.exports = mongoose.model('Dashboard', service_schema);