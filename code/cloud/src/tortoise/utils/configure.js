// Get the routing table and register the controllers.
var routing_table = require('./routing_table')();

// Configure routings.
module.exports.configure = function(app) {
	routing_table.forEach(function(route) {
		console.log("uri: "+route.uri);
		// console.log("controller: "+route.controller);
		app.use(route.uri, require(route.controller));
	});
	
	// Error handlers:
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	// error handlers
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});
}