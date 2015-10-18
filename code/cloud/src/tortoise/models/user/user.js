// Load required packages
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true }, // username, mobile number, email id
    account_type: { type: String, default: 'admin' }, // admin, vendor, customer
    first_name: String,
    last_name: String,
    passwordHash: String,
    passwordSalt: String,
    verified: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);