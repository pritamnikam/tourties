// Load required packages and data models
var Dashboard = require('../models/dashboard');

// Create endpoint /tortoise/dashboard for POST
exports.postDashboard = function(req, res) {
  var dashboard = new Dashboard({
	  	service_type: req.body.service_type,
    	service_name: req.body.service_name,
    	service_id: req.body.service_id,
    	attribute: req.body.attribute,
    	language: req.body.language,
    	icon: req.body.icon,
    	label: req.body.label,
    	pending_notices: req.body.pending_notices
  });
  
  dashboard.save(function(err) {
    if (err)
      res.send(err);

    res.json(dashboard);
  });
};

// Create endpoint /tortoise/dashboard/all for GET
exports.getDashboards = function(req, res) {
  Dashboard.find(function(err, dashboard) {
    if (err)
      res.send(err);

    res.json(dashboard);
  });
};

// Create endpoint /tortoise/dashboard/:service_id for GET
exports.getDashboard = function(req, res) {
  Dashboard.find({service_id: req.params.service_id}, function(err, dashboard) {
    if (err)
      res.send(err);

    res.json(dashboard);
  });
};