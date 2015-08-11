// Load required packages and data models
var express = require('express');
var router = express.Router();
var User = require('../models/user');

// ---------------------------------------------------------------//

// Create endpoint /tortoise/auth/session for POST
var postUsers = function(req, res) {
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
var getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /tortoise/users/:user_id for GET
var getUser = function(req, res) {
  User.find({_id: req.params.user_id}, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// ---------------------------------------------------------------//

// Create endpoint /tortoise/users/authenticate for POST
router.route('/authenticate')
	.post(postUsers);

// Create endpoint handlers for /tortoise/users
router.route('/')
	.get(getUsers);

// Create endpoint /tortoise/users/:user_id for GET
router.route('/:user_id')
	.get(getUser);
// ---------------------------------------------------------------//

module.exports = router;
