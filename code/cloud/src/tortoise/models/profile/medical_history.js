// Load required packages
var mongoose = require('mongoose');

// Defind the schema for user medical_history profile
var medical_history_schema = new mongoose.Schema({
	  dob: {
		  format: String,
		  date: Date
	  },
	  
	  height: {
		  unit: String,
		  value: Number
	  },
	  
	  weight: {
		  unit: String,
		  value: Number
	  },
	
	  blood_pressure: {
		dateformat: String,
		last_reading_on: Date,
		systole: Number,
		diastole: Number
	  },
	  
	  diabetic: {
		dateformat: String,
		last_reading_on: Date,
		reading: {
			fasting: Number,
			post_meal: Number
		}
	  },
	  
	  thyroid: {
		dateformat: String,
		last_reading_on: Date,
		report_uri: String
	  },

	  user_id: String
});
	
// Export the medical_history data model
module.exports = mongoose.model('MedicalHistory', medical_history_schema);