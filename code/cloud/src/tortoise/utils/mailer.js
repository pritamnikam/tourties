var express = require('express'),
    nodemailer = require("nodemailer"),
    app = express();

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
// create reusable transporter object using SMTP transport
var smtp_transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "tortoisehelpdesk@gmail.com",
        pass: "tortoise-support-group@2015"
    }
});


/*------------------SMTP Over-----------------------------*/

var ComposeAndSend = function (message, subject, body, callback) {
    
    // console.log("Inside SendWelcomeMail");
    // setup e-mail data with unicode symbols
    var mail_options = {
        from: 'Tortoise Support Group <tortoisehelpdesk@gmail.com>', // sender address
        to: message.name + '<' + message.email + '>', // list of receivers
        subject: subject, // Subject line
        // text: 'Hello world ✔', // plaintext body
        html: body // html body
    };

    // send mail with defined transport object
    smtp_transport.sendMail(mail_options, function (error, info) {
        if (error) {
            console.log(error);
        }

        console.log('Message sent: ' + mail_options);
        return callback(error);
    });
}

// Send the welcome email for a/c activation.
module.exports.SendWelcomeMail = function (message, callback) {
    // Set subject and email body.
    var subject = "[Tortoise Support] Welcome!";
    var mail_body = "Welcome <b> " + message.name + "</b>," 
                    + "<p> Please click on the link to verify your email.<br>" 
                    + "<a href = " + message.verifyURL + "> Click here </a> for account activation.</a>"
                    + "<p> Thanksand regards, <br> Tortoise Support Group";
    
    ComposeAndSend(message, subject, mail_body, callback);
}
