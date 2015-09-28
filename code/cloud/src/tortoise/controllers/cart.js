// Load required packages and data models
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart/cart');

// ---------------------------------------------------------------//

var CartController = function (cartModel) {
     this.Response = require('../models/response');
     this.Messages = require('../models/messages');
     this.cartModel = cartModel;
};

CartController.prototype.postCart = function (callback) {
    var me = this;
    Cart.findOne({user_id: me.cartModel.user_id, item_id: me.cartModel.item_id},
                  function(err, cart) {
        if (err) {
            // DB Error
            return callback(err, new me.Response({ success: false, extras: { msg: me.Messages.DB_ERROR } }));
        } else if (cart) {
            // Update the quanity by one
            Cart.update(
                // Condition
                {_id: cart._id},

                // Update
                {user_id: cart.user_id, item_id: cart.item_id,
                 item_name: cart.item_name, quantity: ++cart.quantity,
                 price: cart.price},

                // Options
                {multi: false},

                // Callback
                function (err, numberAffected, rawResponse) {
                    callback(err, new me.Response({ success: true, extras: 'Cart updated.' }));
                });
        } else {
            // New entry
            var cart = new Cart({
                user_id: me.cartModel.user_id,
                item_id: me.cartModel.item_id,
                item_name: me.cartModel.item_name,
                quantity: 1,
                price: me.cartModel.price
            });

            // Add to db
            cart.save(function(err) {
                if (err) {
                    // DB Error
                    return callback(err, new me.Response({ success: false, extras: { msg: me.Messages.DB_ERROR } }));
                } else { 
                    callback(err, new me.Response({ success: true, extras: 'Cart updated.' }));
                }
            });
        }
    });
}

// End point for /tortoise/cart/:user_id
CartController.prototype.getCart = function (user_id, callback) {
    var me = this;
    Cart.find(
        // Condition
        {user_id: user_id},

        // Callback
        function(err, carts) {
            if (err) {
                // DB error
                return callback(err, new me.Response({ success: false, extras: { msg: me.Messages.DB_ERROR } }));
            }

            var items = [];
            var total = 0;
            
            for	(var index = 0; index < carts.length; ++index) {
                
                items.push({
                    _id: carts[index]._id,
                    item_id: carts[index].item_id,
                    item_name: carts[index].item_name,
                    quantity: carts[index].quantity,
                    price: carts[index].price
                });

                total += (carts[index].quantity * carts[index].price);
            } // end of for

            return callback(err, new me.Response({
                      success: true,
                      extras: {user_id: user_id, 
                               items: items,
                               total: total}}));
      }); // end of find
}

CartController.prototype.putCart = function (id, callback)  {
    var me = this;
    Cart.update(
        // Condition
        {_id: id},

        // Update
        {user_id: me.cartModel.user_id, item_id: me.cartModel.item_id,
            item_name: me.cartModel.item_name, quantity: me.cartModel.quantity,
            price: me.cartModel.price},

        // Options
        {multi: false},

        // Callback
        function (err, numberAffected, rawResponse) {
            callback(err, new me.Response({ success: true, extras: 'Cart updated.' }));
        });
}

CartController.prototype.deleteCart = function (id, callback)  {
    var me = this;
    Cart.remove({ _id: id }, function (err, cart) {
        callback(err, new me.Response({ success: true, extras: { cartModels: cart } }));
    });
}

// ---------------------------------------------------------------//


var postCart = function (req, res) {
    var controller = new CartController(req.body);
    controller.postCart(function (err, response) {
        res.send(response);
    });
}

var getCart = function (req, res) {
    var controller = new CartController(req.body);
    controller.getCart(req.params.id, function (err, response) {
        res.send(response);
    });
}

var putCart = function (req, res) {
    var controller = new CartController(req.body);
    controller.putCart(req.params.id, function (err, response) {
        res.send(response);
    });
}


var deleteCart = function (req, res) {
    var controller = new CartController(req.body);
    controller.deleteCart(req.params.id, function (err, response) {
        res.send(response);
    });
}

// ---------------------------------------------------------------//
// Create endpoint /tortoise/cart for POST.
router.route('/')
  .post(postCart);

// Create endpoint /tortoise/cart/:id for GET, PUT and DELETE.
router.route('/:id')
  .get(getCart)
  .put(putCart)
  .delete(deleteCart);

// ---------------------------------------------------------------//

module.exports = router;
