// Routing table stores the mapping controller to path.
module.exports = function() {
	return [
		    // For testing:
			{uri: '/', controller: '../controllers/index'},
			// {uri: '/users', controller: '../controllers/users'},

			// User login:
			{uri: '/tortoise/users', controller: '../controllers/users'},
			{uri: '/tortoise/users/:user_id', controller: '../controllers/users'},
			{uri: '/tortoise/users/register', controller: '../controllers/users'},
			{uri: '/tortoise/users/logon', controller: '../controllers/users'},
			{uri: '/tortoise/users/logoff', controller: '../controllers/users'},
			{uri: '/tortoise/users/resetpassword', controller: '../controllers/users'},
			{uri: '/tortoise/users/resetpasswordfinal', controller: '../controllers/users'},

			// User profile:
			{uri: '/tortoise/user/profile', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/nameinfo', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/nameinfo/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/address', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/address/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/service', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/service/:user_id', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/medical_history', controller: '../controllers/profile'},
			{uri: '/tortoise/user/profile/medical_history/:user_id', controller: '../controllers/profile'},

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

			// Cart Management:
			{uri: '/tortoise/cart', controller: '../controllers/cart'},
			{uri: '/tortoise/cart/:id', controller: '../controllers/cart'},
		  ];
};