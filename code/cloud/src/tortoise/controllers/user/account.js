var AccountController = function (userModel, session, verification_token, mailer) {
    try {
        this.crypto = require('crypto');
        this.uuid = require('node-uuid');
        this.Response = require('../../models/response.js');
        this.Messages = require('../../models/messages.js');
        this.userModel = userModel;
        this.session = session;
        this.User = require('../../models/user/user.js');
        this.emailVerificationEnabled = true; // set to |false| to avaoid sending verification email for user activation.
        this.VerificationToken = verification_token;
        this.mailer = mailer;
    } catch (exception) {
        console.log(exception);
    }
};

AccountController.prototype.getSession = function () {
    return this.session;
};

AccountController.prototype.setSession = function (session) {
    this.session = session;
};

AccountController.prototype.hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default 
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

/**
 * Our token is simply a random UUID, but here’s a convenience function to
 * set the token and save the model, and then return the token in a callback.
*/
AccountController.prototype.createVerificationToken = function (verification_token, callback) {
    var token = this.uuid.v4();
    verification_token.set('token', token);
    verification_token.save(function (err) {
        if (err) return callback(err);
        // console.log("Verification token", verification_token);
        return callback(null, token);
    });
};

AccountController.prototype.generateTokenAndSendMail = function(user, request, callback) {
    // console.log("Inside generateTokenSendMail");
    var me = this;
    var extra = {_userId: user._id};
    var verification_token = new me.VerificationToken(extra);

    // Create a token and send account verification email.
    me.createVerificationToken(verification_token, function (err, token) {
        if (err) {
            // console.log("Couldn't create verification token", err);
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.DB_ERROR
                    }
                }));
        }

        // Message structure.
        var message = {
            email: user.username,
            name: user.first_name + " " + user.last_name,
            verifyURL: request.protocol + "://" + request.get('host') + "/tortoise/users/verify/" + token
        };

        // Call this function to send verification email.
        me.sendVerificationEmail(message, function (error, success) {
            if (error) {
                // not much point in attempting to send again, so we give up
                // will need to give the user a mechanism to resend verification
                // console.error("Unable to send via postmark: " + error.message);
                return callback(error, new me.Response(
                    {
                        success: false, extras: {
                            msg: me.Messages.VERIFICATION_EMAIL_SEND_ERROR
                        }
                    }));
            }

            // console.log("Sent to postmark for delivery");
            return callback(error, new me.Response(
                {
                    success: true, extras: {
                        message: "Email sent for account activation.",
                        detail: message
                    }
                }));
        });
    });
}

AccountController.prototype.register = function (newUser, request, callback) {
    var me = this;
    me.userModel.findOne({ username: newUser.username }, function (err, user) {

        if (err) {
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.DB_ERROR
                    }
                }));
        }

        if (user) {
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.USERNAME_ALREADY_EXISTS
                    }
                }));
        } else {

            newUser.save(function (err, user, numberAffected) {

                if (err) {
                    return callback(err, new me.Response(
                        {
                            success: false, extras: {
                                msg: me.Messages.DB_ERROR
                            }
                        }));
                }

                if (numberAffected === 1) {
                    var userProfileModel = {
                        id: user._id,
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        account_type: user.account_type
                    };

                    if (me.emailVerificationEnabled == true) {
                        me.generateTokenAndSendMail(user, request, function (err, response) {
                            if (err) {
                                // console.log('Error while sending email.');
                                return callback(err, response);
                            }

                            // console.log('Sent email verification.');
                            return callback(err, response);
                        });

                    } else {
                        me.session.userProfileModel = userProfileModel;
                        me.session.id = me.uuid.v4();

                        return callback(err, new me.Response(
                            {
                                success: true, extras: {
                                    userProfileModel: userProfileModel,
                                    sessionId: me.session.id
                                }
                            }));
                    }
                } else {
                    return callback(err, new me.Response(
                        {
                            success: false, extras: {
                                msg: me.Messages.COULD_NOT_CREATE_USER
                            }
                        }));
                }

            });
        }

    });
};

AccountController.prototype.logon = function(username, password, callback) {

    var me = this;

    me.userModel.findOne({ username: username }, function (err, user) {

        if (err) {
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.DB_ERROR
                    }
                }));
        }

        if (user) {

            if (user.verified == false) {
                return callback(err, new me.Response(
                    {
                        success: false, extras: {
                            msg: me.Messages.ACCOUNT_VERIFICATION_PENDING
                        }
                    }));
            }

            me.hashPassword(password, user.passwordSalt, function (err, passwordHash) {

                if (passwordHash == user.passwordHash) {
                    var userProfileModel = {
                        id: user._id,
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        account_type: user.account_type
                    };

                    me.session.userProfileModel = userProfileModel;
                    me.session.id = me.uuid.v4();

                    return callback(err, new me.Response(
                        {
                            success: true, extras: {
                                userProfileModel: userProfileModel,
                                sessionId: me.session.id
                            }
                        }));
                } else {
                    return callback(err, new me.Response(
                        {
                            success: false, extras: {
                                msg: me.Messages.INVALID_PWD
                            }
                        }));
                }
            });
        } else {
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.USERNAME_NOT_FOUND
                    }
                }));
        }

    });
};

AccountController.prototype.logoff = function () {
    if (this.session.userProfileModel) delete this.session.userProfileModel;
    if (this.session.id) delete this.session.id;
    return;
};

AccountController.prototype.resetPassword = function (username, callback) {
    var me = this;
    me.userModel.findOne({ username: username }, function (err, user) {

        if (err) {
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.DB_ERROR
                    }
                }));
        }

        if (user) {
            // Save the user's username and a password reset hash in session.
            var passwordResetHash = me.uuid.v4();
            me.session.passwordResetHash = passwordResetHash;
            me.session.usernameWhoRequestedPasswordReset = username;
            
            return callback(err, new me.Response(
                {
                    success: true, extras: {
                        passwordResetHash: passwordResetHash
                    }
                }));
        } else {
            return callback(err, new me.Response(
                {
                    success: false, extras: {
                        msg: me.Messages.USERNAME_NOT_FOUND
                    }
                }));
        }        
    })
};

AccountController.prototype.resetPasswordFinal = function (username, newPassword, newPasswordConfirm, passwordResetHash, callback) {
    var me = this;
    if (!me.session || !me.session.passwordResetHash) {
        return callback(null, new me.Response(
            {
                success: false, extras: {
                    msg: me.Messages.PASSWORD_RESET_EXPIRED
                }
            }));
    }

    if (me.session.passwordResetHash !== passwordResetHash) {
        return callback(null, new me.Response(
            {
                success: false, extras: {
                    msg: me.Messages.PASSWORD_RESET_HASH_MISMATCH
                }
            }));
    }

    if (me.session.usernameWhoRequestedPasswordReset !== username) {
        return callback(null, new me.Response(
            {
                success: false, extras: {
                    msg: me.Messages.PASSWORD_RESET_USERNAME_MISMATCH
                }
            }));
    }

    if (newPassword !== newPasswordConfirm) {
        return callback(null, new me.Response(
            {
                success: false, extras: {
                    msg: me.Messages.PASSWORD_CONFIRM_MISMATCH
                }
            }));
    }

    var passwordSalt = this.uuid.v4();

    me.hashPassword(newPassword, passwordSalt, function (err, passwordHash) {

        me.userModel.update({ username: username }, { passwordHash: passwordHash, passwordSalt: passwordSalt }, function (err, numberAffected, raw) {

            if (err) {
                return callback(err, new me.Response(
                    {
                        success: false, extras: {
                            msg: me.Messages.DB_ERROR
                        }
                    }));
            }

            if (numberAffected < 1) {
                return callback(err, new me.Response(
                    {
                        success: false, extras: {
                            msg: me.Messages.COULD_NOT_RESET_PASSWORD
                        }
                    }));
            } else {
                return callback(err, new me.Response(
                    {
                        success: true,
                        extras: null
                    }));
            }                
        });
    });
};

AccountController.prototype.getUserFromUserRegistration = function(userRegistrationModel) {
    var me = this;

    if (userRegistrationModel.password !== userRegistrationModel.passwordConfirm) {
        return new me.Response({ success: false, extras: { msg: me.Messages.PASSWORD_CONFIRM_MISMATCH } });
    }

    var passwordSaltIn = this.uuid.v4(),
            cryptoIterations = 10000, // Must match iterations used in controller#hashPassword.
            cryptoKeyLen = 64,       // Must match keyLen used in controller#hashPassword.
            passwordHashIn;

    var user = new this.User({
        username: userRegistrationModel.username,
        first_name: userRegistrationModel.first_name,
        last_name: userRegistrationModel.last_name,
        account_type: userRegistrationModel.account_type,
        passwordHash: this.crypto.pbkdf2Sync(userRegistrationModel.password, passwordSaltIn, cryptoIterations, cryptoKeyLen),
        passwordSalt: passwordSaltIn,
        verified: false
    });

    return new me.Response({ success: true, extras: { user: user } });
}

AccountController.prototype.sendVerificationEmail = function(message,  callback) {
    // Send a welcome mail to the user.
    this.mailer.SendWelcomeMail(message, function (err) {
        if (err) callback(true, false);
        callback(false, true);
    });
}

module.exports = AccountController;