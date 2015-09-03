// Load required packages and data models
var express = require('express');
var router = express.Router();
var Profile = require('../models/profile/profile');
var Address = require('../models/profile/address');
var Service = require('../models/profile/service');
var MedicalHistory = require('../models/profile/medical_history');

// ------------------------------------------------------------------ //

// Create endpoint /tortoise/user/profile/nameinfo for POST
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


// Create endpoint /tortoise/user/profile/nameinfo/:user_id for GET
var getProfile = function(req, res) {
  Profile.find({user_id: req.params.user_id}, function(err, profile) {
    if (err)
      res.send(err);

    res.json(profile);
  });
};



// ------------------------------------------------------------------ //

// Create endpoint /tortoise/user/profile/address for POST
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

// Create endpoint /tortoise/user/profile/address/:user_id for GET
var getAddress = function(req, res) {
  Address.find({user_id: req.params.user_id}, function(err, address) {
    if (err)
      res.send(err);

    res.json(address);
  });
};


// ------------------------------------------------------------------ //

// Create endpoint /tortoise/user/profile/service for POST
var postService = function(req, res) {
  var service = new Service({
  	service_name: req.body.service_name,
  	service_type: req.body.service_type,
  	attribute: req.body.attribute,
  	user_id: req.body.user_id,
  });

  service.save(function(err) {
    if (err)
      res.send(err);

    res.json({ data: service });
  });
};


// Create endpoint /tortoise/user/profile/service/:user_id for GET
var getService = function(req, res) {
  Service.find({user_id: req.params.user_id}, function(err, service) {
    if (err)
      res.send(err);

    res.json(service);
  });
};



// ------------------------------------------------------------------ //


// Create endpoint /tortoise/user/profile/medical_history for POST
var postMedicalHistory = function(req, res) {
  var medical_service = new MedicalHistory({
    dob: {
        date_format: req.body.dob_format,
        date: req.body.dob_date,
    },
 
    height: {
        unit: req.body.height_unit,
        value: req.body.height_value,
    },
	  
    weight: {
        date_format: req.body.weight_date_format,
        last_reading_on: req.body.weight_last_reading_on,
        unit: req.body.weight_unit,
        value: req.body.weight_value,
    },
	
    blood_pressure: {
        date_format: req.body.bp_date_format,
        last_reading_on: req.body.bp_last_reading_on,
        systole: req.body.bp_systole,
        diastole: req.body.bp_diastole,
    },

    diabetic: {
        date_format: req.body.diabetise_dateformat,
        last_reading_on: req.body.diabetise_last_reading_on,
        reading: {
            fasting: req.body.diabetise_fasting,
            post_meal: req.body.diabetise_post_meal,
        },
    },

    thyroid: {
        date_format: req.body.thyroid_dateformat,
        last_reading_on: req.body.thyroid_last_reading_on,
        report_uri: req.body.thyroid_report_uri,
    },
      
    user_id: req.body.user_id,
  });

  medical_service.save(function(err) {
    if (err)
      res.send(err);

    res.json({ data: medical_service });
  });
};


// Create endpoint /tortoise/user/profile/service/:user_id for GET
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


// Create endpoint /tortoise/user/profile for GET
var getProfilesAll = function (req, res) {
    res.json({message: '/tortoise/user/profile'});
};


// ---------------------------------------------------------------//

// Create endpoint /tortoise/user/profile/:user_id for POST
router.route('/')
	.get(getProfileAll);

// Create endpoint /tortoise/user/profile/nameinfo for POST
router.route('/nameinfo')
	.post(postProfile);

// Create endpoint /tortoise/user/profile/nameinfo/:user_id for GET
router.route('/nameinfo/:user_id')
	.get(getProfile);

// Create endpoint /tortoise/user/profile/address for POST
router.route('/address')
	.post(postAddress);

// Create endpoint /tortoise/user/profile/address/:user_id for GET
router.route('/address/:user_id')
	.get(getAddress);

// Create endpoint /tortoise/user/profile/service for POST
router.route('/service')
	.post(postService);

// Create endpoint /tortoise/user/profile/service/:user_id for GET
router.route('/service/:user_id')
	.get(getService);

// Create endpoint /tortoise/user/profile/medical_history for POST
router.route('/medical_history')
	.post(postMedicalHistory);

// Create endpoint /tortoise/user/profile/medical_history/:user_id for GET
router.route('/medical_history/:user_id')
	.get(getMedicalHistory);

// ---------------------------------------------------------------//

module.exports = router;
