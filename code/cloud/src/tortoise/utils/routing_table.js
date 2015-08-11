// Routing table stores the mapping controller to path.
module.exports = function() {
	return [
		    // For testing:
			{uri: '/', controller: '../controllers/index'},
			{uri: '/users', controller: '../controllers/users'},
			
			// User login:
			{uri: '/tortoise/users', controller: '../controllers/user'},
			{uri: '/tortoise/users/:user_id', controller: '../controllers/user'},
			{uri: '/tortoise/users/authenticate', controller: '../controllers/user'},
			
			// User profile:
			{uri: '/tortoise/user/profile', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/address', controller: '../controllers/profile'},
			{uri: '/tortoise/user/address/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/service', controller: '../controllers/profile'},
			{uri: '/tortoise/user/service/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/medical_history', controller: '../controllers/profile'},
			{uri: '/tortoise/user/medical_history/:user_id', controller: '../controllers/profile'},
			
			// Service dashboard:
			{uri: '/tortoise/services/dashboard', controller: '../controllers/dashboard'},
			{uri: '/tortoise/services/dashboard/:service_id', controller: '../controllers/dashboard'},

			// Health listings:
			{uri: '/tortoise/services/healthlistings', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/hospitals', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/physicians', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/pharmacies', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/hospitals/:listing_id', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/physicians/:listing_id', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/pharmacies/:listing_id', controller: '../controllers/health_listing'},
			
			// User reviews:
			{uri: '/tortoise/services/healthlistings/reviews/hospitals/:listing_id', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/reviews/physicians/:listing_id', controller: '../controllers/health_listing'},
			{uri: '/tortoise/services/healthlistings/reviews/pharmacies/:listing_id', controller: '../controllers/health_listing'},
		  ];
};