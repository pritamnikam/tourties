// Load required packages
var mongoose = require('mongoose');

// Defind the schema for shopping cart.
var cart_schema = new mongoose.Schema({
	user_id: String,
	item_id: String,
    item_name: String,
    quantity: Number,
    price: Number
});

// Export the service data model
module.exports = mongoose.model('ShoppingCart', cart_schema);