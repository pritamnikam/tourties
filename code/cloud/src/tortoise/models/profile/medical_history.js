// Load required packages
var mongoose = require('mongoose');

// Defind the schema for user medical_history profile
var medical_history_schema = new mongoose.Schema({
    dob: {
        date_format: String,
        date: String,
    },

    height: {
        unit: String,
        value: Number,
    },

    weight: {
        date_format: String,
        last_reading_on: String,
        unit: String,
        value: Number,
    },

    blood_pressure: {
        date_format: String,
        last_reading_on: String,
        systole: Number,
        diastole: Number,
    },

    diabetic: {
        date_format: String,
        last_reading_on: String,
        reading: {
            fasting: Number,
            post_meal: Number,
        },
    },

    thyroid: {
        date_format: String,
        last_reading_on: String,
        report_uri: String,
    },

    user_id: String,
});
	
// Export the medical_history data model
module.exports = mongoose.model('MedicalHistory', medical_history_schema);