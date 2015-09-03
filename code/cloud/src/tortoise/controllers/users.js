var express = require('express'),
    router = express.Router(),
    AccountController = require('./user/account.js'),
    UserRegistration = require('../models/user/user-registration.js'),
    UserLogon = require('../models/user/user-logon.js'),
    User = require('../models/user/user.js'),
    Response = require('../models/response.js'),
    UserPasswordReset = require('../models/user/user-pwd-reset.js'),
    UserPasswordResetFinal = require('../models/user/user-pwd-reset-final.js'),
    session = [],
    UserController = require('./user/user.js');

var postAccountRegister = function(req, res) {
    var accountController = new AccountController(User, req.session);
    var userRegistration = new UserRegistration(req.body);
    var response = accountController.getUserFromUserRegistration(userRegistration);

    if (response.success) {
        accountController.register(response.extras.user, function (err, register_response) {
            return res.send(register_response);
        });
    } else {
        res.send(response);
    }
};

var postAccountLogon = function(req, res) {
    var accountController = new AccountController(User, req.session);
    var userLogon = new UserLogon(req.body);

    accountController.logon(userLogon.username, userLogon.password, function (err, response) {
        return res.send(response);
    });
};

var getAccountLogoff = function (req, res) {
    var accountController = new AccountController(User, req.session);
    accountController.logoff();
    res.send(new Response({ success: true }));
};

var postAccountLogoff = function (req, res) {
    var accountController = new AccountController(User, req.session);
    accountController.logoff();
    res.send(new Response({ success: true }));
};

var postPasswordReset = function (req, res) {
    var accountController = new AccountController(User, req.session);
    var userPasswordReset = new UserPasswordReset(req.body);
    accountController.resetPassword(userPasswordReset.username, function (err, response) {
        return res.send(response);
    });
};

var postPasswordResetFinal = function (req, res) {
    var accountController = new AccountController(User, req.session);
    var userPasswordResetFinal = new UserPasswordResetFinal(req.body);
    accountController.resetPasswordFinal(userPasswordResetFinal.username,
                                         userPasswordResetFinal.newPassword,
                                         userPasswordResetFinal.newPasswordConfirm,
                                         userPasswordResetFinal.passwordResetHash,
                                         function (err, response) {
                                            return res.send(response);
                                        });
};


var getAllUsers = function(req, res) {
    var user_controller = new UserController(User);
    user_controller.readAllUsers(function (err, response) {
        return res.send(response);
    });
};

var getUser = function(req, res) {
    var user_controller = new UserController(User);
    user_controller.readUser(req.params.user_id, function (err, response) {
        return res.send(response);
    });
}

var deleteUser = function (req, res) {
    var user_controller = new UserController(User);
    user_controller.deleteUser(req.params.user_id, function (err, response) {
        return res.send(response);
    });
}

var putUser = function (req, res) {
    var user_controller = new UserController(User);
    var userRegistration = new UserRegistration(req.body);
    user_controller.updateUser(req.params.user_id, userRegistration, function (err, response) {
        return res.send(response);
    });
}

// ---------------------------------------------------------------//

router.route('/')
    .get(getAllUsers);

router.route('/:user_id')
    .get(getUser)
    .delete(deleteUser)
    .put(putUser);

router.route('/register')
	.post(postAccountRegister);

router.route('/logon')
	.post(postAccountLogon);

router.route('/logoff')
	.get(getAccountLogoff)
	.post(postAccountLogoff);

router.route('/resetpassword')
	.post(postPasswordReset);

router.route('/resetpasswordfinal')
	.post(postPasswordResetFinal)

// ---------------------------------------------------------------//

module.exports = router;