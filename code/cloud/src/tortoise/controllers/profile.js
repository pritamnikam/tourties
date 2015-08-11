// Load required packages and data models
var express = require('express');
var router = express.Router();
var Profile = require('../models/profile/profile');
var Address = require('../models/profile/address');
var Service = require('../models/profile/service');
var MedicalHistory = require('../models/profile/medical_history');

// ------------------------------------------------------------------ //

// Create endpoint /tortoise/user/profile for POST
var postProfile = function(req, res) {
  var profile = new Profile({
   	first_name: req.body.first_name,
  	last_name: req.body.last_name,
  	screen_name: req.body.screen_name,
  	email: req.body.email,
  	phone: req.body.phone,
  	user_id: req.body.user_id,
  });

  profile.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Welcome! '+ req.body.first_name,
               data: profile });
  });
};


// Create endpoint /tortoise/user/profile/:user_id for GET
var getProfile = function(req, res) {
  Profile.find({user_id: req.params.user_id}, function(err, profile) {
    if (err)
      res.send(err);

    res.json(profile);
  });
};



// ------------------------------------------------------------------ //

// Create endpoint /tortoise/user/address for POST
var postAddress = function(req, res) {
  var address = new Address({
	  line1: req.body.line1,
	  line2: req.body.line2,
	  city: req.body.city,
	  state: req.body.state,
	  zip: req.body.zip,
	  country: req.body.country,
  	user_id: req.body.user_id,
  });

  address.save(function(err) {
    if (err)
      res.send(err);

    res.json({ data: address });
  });
};

// Create endpoint /tortoise/user/address/:user_id for GET
var getAddress = function(req, res) {
  Address.find({user_id: req.params.user_id}, function(err, address) {
    if (err)
      res.send(err);

    res.json(address);
  });
};


// ------------------------------------------------------------------ //

// Create endpoint /tortoise/user/service for POST
var postService = function(req, res) {
  var service = new Service({
  	service_name: req.body.service_name,
  	service_type: req.body.service_type,
  	attribute: req.body.attribute,
  	service_id: req.body.service_id,
  	user_id: req.body.user_id,
  });

  service.save(function(err) {
    if (err)
      res.send(err);

    res.json({ data: service });
  });
};


// Create endpoint /tortoise/user/service/:user_id for GET
var getService = function(req, res) {
  Service.find({user_id: req.params.user_id}, function(err, service) {
    if (err)
      res.send(err);

    res.json(service);
  });
};



// ------------------------------------------------------------------ //


// Create endpoint /tortoise/user/medical_service for POST
var postMedicalHistory = function(req, res) {
  var medical_service = new MedicalHistory({
	  dob: {
		  format: req.body.format,
		  date: req.body.date
	  },
	  
	  height: {
		  unit: req.body.height,
		  value: req.body.value
	  },
	  
	  weight: {
		  unit: req.body.unit,
		  value: req.body.value
	  },
	
	  blood_pressure: {
  		dateformat: req.body.dateformat,
  		last_reading_on: req.body.last_reading_on,
  		systole: req.body.systole,
  		diastole: req.body.diastole
	  },
	  
	  diabetic: {
  		dateformat: req.body.dateformat,
  		last_reading_on: req.body.last_reading_on,
  		reading: {
  			fasting: req.body.fasting,
  			post_meal: req.body.post_meal
  		}
    },
	  
	  thyroid: {
  		dateformat: req.body.dateformat,
  		last_reading_on: req.body.last_reading_on,
  		report_uri: req.body.report_uri
	  },

  	user_id: req.body.user_id
  });

  medical_service.save(function(err) {
    if (err)
      res.send(err);

    res.json({ data: medical_service });
  });
};


// Create endpoint /tortoise/user/service/:user_id for GET
var getMedicalHistory = function(req, res) {
  MedicalHistory.find({user_id: req.params.user_id}, function(err, medical_history) {
    if (err)
      res.send(err);

    res.json(medical_history);
  });
};

// ------------------------------------------------------------------ //


// Create endpoint /tortoise/user/profile/all/:user_id for GET
var getProfileAll = function(req, res) {
    var user_profile;
    var user_address;
    var user_service;
    var user_medical_history;
    
    Profile.find({user_id: req.params.user_id}, function(err, profile) {
      if (err)
        res.send(err);
      
      user_profile = profile;
    });
    
    Address.find({user_id: req.params.user_id}, function(err, address) {
      if (err)
        res.send(err);

      user_address = address;
    });
    
    Service.find({user_id: req.params.user_id}, function(err, service) {
      if (err)
        res.send(err);

      user_service = service;
    });
  
    MedicalHistory.find({user_id: req.params.user_id}, function(err, medical_history) {
    if (err)
      res.send(err);

      user_medical_history = medical_history;
    });
    
    res.json({
      profile: {
        user: user_profile,
        address: user_address,
        services: user_service,
        medical_history: user_medical_history
      }
    });
};


// ---------------------------------------------------------------//

// Create endpoint /tortoise/user/profile for POST
router.route('/user/profile')
	.post(postProfile);

// Create endpoint /tortoise/user/profile/:user_id for GET
router.route('/user/profile/:user_id')
	.get(getProfile);

// Create endpoint /tortoise/user/address for POST
router.route('/user/address')
	.post(postAddress);

// Create endpoint /tortoise/user/address/:user_id for GET
router.route('/user/address/:user_id')
	.get(getAddress);

// Create endpoint /tortoise/user/service for POST
router.route('/user/service')
	.post(postService);

// Create endpoint /tortoise/user/service/:user_id for GET
router.route('/user/service/:user_id')
	.get(getService);

// Create endpoint /tortoise/user/medical_history for POST
router.route('/user/medical_history')
	.post(postMedicalHistory);

// Create endpoint /tortoise/user/medical_history/:user_id for GET
router.route('/user/medical_history/:user_id')
	.get(getMedicalHistory);

// ---------------------------------------------------------------//

module.exports = router;