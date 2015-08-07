// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var user_schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
user_schema.pre('save', function(callback) {
  var user = this;

  // Bail out! The password hasn't changed.
  if (!user.isModified('password'))
  	return callback();

  // Compute password hash.
  bcrypt.genSalt(5, function(err, salt) {
    if (err)
		return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err)
		  return callback(err);
	  
      user.password = hash;
      callback();
    });
  });
});


// Verify that the passwords match.
user_schema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err)
		  return callback(err);

    callback(null, isMatch);
  });
};

// Export the user data model
module.exports = mongoose.model('User', user_schema);