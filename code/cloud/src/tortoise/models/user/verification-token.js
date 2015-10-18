// Load required packages
var mongoose = require('mongoose');

// Defind the schema for Verification token
var VerificationTokenSchema = new mongoose.Schema({
    _userId: {type: String, required: true},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: '24h'}
});

// Export the service data model
module.exports = mongoose.model('VerificationToken', VerificationTokenSchema);
