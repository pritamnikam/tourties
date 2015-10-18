var UserController = function (userModel, VerificationToken) {

    var crypto = require('crypto'),
        uuid = require('node-uuid'),
        Response = require('../../models/response.js'),
        Messages = require('../../models/messages.js');

    // TODO: Implement login, logout and changePassword methods. 

    var readAllUsers = function (callback) {
        // For all users registered.
        userModel.find(function (err, users) {

            if (err) {
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.DB_ERROR
                        }
                    }));
            } 

            var userProfileModels = [];

            users.forEach(function (user) {
                userProfileModel = {
                    id: user._id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    account_type: user.account_type
                };

                userProfileModels.push(userProfileModel);
            });

            return callback(err, new Response(
                {
                    success: true, extras: {
                        userProfileModels: userProfileModels
                    }
                }));
        });
    };

    var readUser = function (user_id, callback) {
        userModel.findOne({_id: user_id}, function (err, user) {

            if (err) {
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.DB_ERROR
                        }
                    }));
            }

            if (user) {

                return callback(err, new Response({
                    success: true, extras: {
                        userProfileModel: {
                            username: user.username,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            account_type: user.account_type
                        }
                    }
                }));
            } else {
                // No record found
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.NOT_FOUND
                        }
                    }));
            }
        });
    };

    var createUser = function (user, callback) {

        // TODO: Error if user already exists.
        // TODO: Hash Password.

        user.passwordSalt = uuid.v4();

        hashPassword(user.password, user.passwordSalt, function (err, passwordHash) {

            if (err) {
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.DB_ERROR
                        }
                    }));
            }

            user.passwordHash = passwordHash;
            user.save(function (err) {
                callback(err, user, numberAffected);
            });

        });
    };

    var updateUser = function (user_id, userIn, callback) {

        userModel.update(
            // Condition
            {_id: user_id},
            // Update
            {
                username: userIn.username,
                first_name: userIn.first_name,
                last_name: userIn.last_name,
                account_type: userIn.account_type
            },
            // Options
            { multi: false },
            // Callback
            function (err, numberAffected, rawResponse) {
                callback(err, new Response(
                    {
                        success: true, extras: {
                            msg: 'User updated.'
                        }
                    }));
            }
        );
    };

    var deleteUser = function (user_id, callback) {
        userModel.remove({ _id: user_id }, function (err, user) {
            callback(err, new Response(
                {
                    success: true, extras: {
                        userProfileModels: user
                    }
                }));
        });
    };

    var userIsValid = function(username, password, callback) {

        userModel.findOne({ username: username }, function (err, user) {

            if (err) {
                callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.DB_ERROR
                        }
                    }));
                return;
            }   // Error case.

            if (!user) {
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.username_NOT_FOUND
                        }
                    })); // User not found case
            }

            // Compare user's password hash with provided password's hash.
            var userPasswordHash = user.passwordHash,
                userPasswordSalt = user.passwordSalt;

            hashPassword(password, userPasswordSalt, function (err, derivedPasswordHash) {

               if (err) {
                    return callback(err, new Response(
                        {
                            success: false, extras: {
                                msg: Messages.DB_ERROR
                            }
                        }));
               }    // Error case.

               if (derivedPasswordHash === userPasswordHash) {

                   // Valid credentials => return a UserProfile instance
                   return callback(err, new Response({
                       success: true, extras: {
                           userProfileModel: new UserProfile({
                               username: user.username,
                               first_name: user.first_name,
                               last_name: user.last_name,
                               account_type: user.account_type
                           })
                       }
                   }));
               } else {
                    return callback(err, new Response(
                        {
                            success: false, extras: {
                                msg: Messages.INVALID_PWD
                            }
                        })); // Invalid password.
               }
           });
        });
    }

    var hashPassword = function (password, salt, callback) {        
        // we use pbkdf2 to hash and iterate 10k times by default 
        var iterations = 1000,
            keyLen = 64; // 64 bit.
        crypto.pbkdf2(password, salt, iterations, keyLen, callback);
    };


    var verifyUser = function (token, callback) {
        VerificationToken.findOne({token: token}, function (err, doc){
            if (err) {
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.DB_ERROR
                        }
                    }));
            }

            if (!doc) {
                // No recored found case: either invalid or token expired.
                return callback(err, new Response(
                    {
                        success: false, extras: {
                            msg: Messages.VERIFICATION_TOKEN_INVALID_OR_EXPIRED
                        }
                    }));
            }

            userModel.findOne({_id: doc._userId}, function (err, user) {
                if (err) {
                    return callback(err, new Response(
                        {
                            success: false, extras: {
                                msg: Messages.DB_ERROR
                            }
                        }));
                }

                user["verified"] = true;
                user.save(function(err) {
                    return callback(err, new Response(
                        {
                            success: true, extras: {
                                message: "Email verified successfuly. Please login."
                            }
                        }));
                });
            });
        });
    }

    return {
        readAllUsers: readAllUsers,
        readUser: readUser,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        verifyUser: verifyUser
    }
};

module.exports = UserController;