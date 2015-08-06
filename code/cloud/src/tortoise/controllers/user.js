// Load required packages and data models
var User = require('../models/user');

// Create endpoint /tortoise/auth/session for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Welcome! '+ req.body.username,
		           data: user });
  });
};

// Create endpoint /tortoise/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /tortoise/users/:user_id for GET
exports.getUser = function(req, res) {
  User.find({_id: req.params.user_id}, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};