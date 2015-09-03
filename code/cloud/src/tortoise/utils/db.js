// Load required packages
var mongoose = require('mongoose'),
    expressSession = require('express-session'),
    mongooseSession = require('mongoose-session');

// 
module.exports.connect = function (app, db_uri) {
    
    // Create the database connection 
    mongoose.connect(db_uri);
    
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + db_uri);
    });
    
    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    
    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    
    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    // Express session registration
    app.use(expressSession({
        key: 'session',
        secret: '128013A7-5B9F-4CC0-BD9E-4480B2D3EFE9',
        store: new mongooseSession(mongoose),
        resave: true,
        saveUninitialized: true
    }));

};